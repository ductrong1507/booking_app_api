const Hotel = require("../models/Hotel.model");
const Transaction = require("../models/Transaction.model");

// list tất cả danh sách hotel
const getListHotel = async (req, res) => {
  // Tạo option phân trang
  const page = +req.query.page || 1;
  const perPage = +req.query.perPage || null;
  try {
    /**
     *  lấy dữ liệu dạng phân trang và lọc theo hotel
     */
    const hoteList = await Hotel.find()
      .skip((page - 1) * perPage)
      .limit(perPage);

    // Đếm số lượng hotel
    const totalHotel = await Hotel.countDocuments();

    return res.send({
      status: true,
      message: "Lấy danh sách hotel thành công!",
      result: hoteList,
      page,
      perPage,
      totalHotel,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "Lấy danh sách Hotel có lỗi!",
      result: error,
    });
  }
};

// list thông tin hotel theo trang chủ
const getHomePageListHotel = async (req, res) => {
  // Xử lý mảng khu vực thành chuỗi biểu thức không phân biệt chữ hoa thường
  const areas = ["Ho Chi Minh", "Ha Noi", "Da Nang"];
  const regexAreas = areas.map((area) => new RegExp(area, "i"));

  try {
    // list Ks theo khu vực và rating
    const hoteListArea = await Hotel.find({
      city: { $in: regexAreas },
    }).sort({
      rating: "desc",
    });

    // list ks theo type
    const hoteListTypeAmount = await Hotel.aggregate([
      // { $group: { _id: "$type", count: { $sum: 1 } } },
      // { $project: { type: "$_id", count: 1, _id: 0 } },
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ]);

    res.send({
      status: true,
      message: "Danh sách hotel trang chủ!",
      result: {
        hoteListArea,
        hoteListTypeAmount,
      },
    });
  } catch (error) {
    res.send(error);
  }
};

// tìm ks dựa trên thông tin tìm kiếm không kèm ngày
const searchHotel = async (req, res) => {
  const { city, peopleQuantity, roomQuantity, dateStart, dateEnd } = req.body;

  try {
    // xử lý tên nhâp vào
    const cityName = city
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");

    const hotel = await Hotel.find({
      city: { $regex: new RegExp(cityName, "i") },
    })
      .populate({
        path: "rooms",
        match: {
          maxPeople: { $gte: peopleQuantity },
          $expr: { $gte: [{ $size: "$roomNumbers" }, roomQuantity] },
        },
      })
      .exec();

    // lọc ra ks ko có phòng
    const filtedHotel = hotel.filter((item) => item.rooms.length !== 0);

    return res.send({
      status: true,
      message: "Tìm hotel theo yêu cầu!",
      result: filtedHotel,
    });
  } catch (error) {
    return res.send(error);
  }
};

// get hotel dự trên ID
const getHotelByID = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findById(id)
      .populate({
        path: "rooms",
      })
      .exec();

    if (!hotel) {
      return res.send({
        status: false,
        message: "Sai ID hotel!",
      });
    }

    return res.send({
      status: true,
      message: "Tìm hotel theo ID",
      result: hotel,
    });
  } catch (error) {
    res.send(error);
  }
};

// get hotel đã lọc ra thông tin booked room
const getHotelBySearchInfo = async (req, res) => {
  const { dateStart, dateEnd, hotelId } = req.body;

  // Xử lý ngày tháng start 14h, end 12h30
  const startDate = new Date(dateStart);
  startDate.setHours(14, 0, 0);

  const endDate = new Date(dateEnd);
  endDate.setHours(12, 30, 0);

  // Gọi database để lấy dữ liệu
  try {
    /**
     * - lấy tất cả transaction theo hotel đang chọn
     *   + có dateStart nằm trong khoảng ngày bắt đầu + ngày kết thúc
     *   + hoặc dateEnd nằm trong khoảng ngày bắt đầu + ngày kết thúc
     * - Sau đó chỉ lấy trường room
     */
    const transactionList = await Transaction.find(
      {
        hotel: hotelId,
        $or: [
          { dateStart: { $gte: startDate, $lte: endDate } },
          { dateEnd: { $gte: startDate, $lte: endDate } },
        ],
      },
      "hotel room dateStart dateEnd "
    );

    // Lấy hotel theo id
    const hotelInfoDB = await Hotel.findById(hotelId)
      .populate({
        path: "rooms",
      })
      .exec();

    /**
     * Logic lọc ra số phòng (roomNumbers) còn trống của Hotel
     *  1. List ra những số phòng đã đặt
     *  2. bỏ những phòng đó ra khỏi mảng hotelInfo
     *  3. Trả về mảng hotelInfo mới không còn những phòng trong list (1)
     */

    // Cần xử lý hotel info chuyển thành Object bình thường để thao tác
    const hotelInfo = hotelInfoDB.toObject();

    // List ra những số phòng đã đặt
    const bookedRoomNumbers = transactionList
      .map((item) => {
        return item.room;
      })
      .flat();

    // Lọc ra những số phòng đã có ở mảng trên
    const newHotelRoom = hotelInfo.rooms.map((roomType) => {
      //   Lọc ra số phòng và loại bỏ những số phòng đã xuất hiện ở mảng listRoomNumber
      const newRoomNumber = roomType.roomNumbers.filter((item) => {
        return !bookedRoomNumbers.includes(item);
      });

      return { ...roomType, roomNumbers: newRoomNumber };
    });

    // cập nhật lại hotel infor
    hotelInfo.rooms = newHotelRoom;

    return res.send({
      status: true,
      message: `Lấy danh sách transaction từ ${startDate} tới ${endDate}`,
      result: {
        startDate: startDate.toString(),
        endDate: endDate.toString(),
        transactionList,
        hotelInfo,
      },
    });
  } catch (error) {
    return res.send({
      status: false,
      message: `Lỗi trong quá tình lấy dữ liệu`,
      result: error,
    });
  }
};

// Tạo hotel mới
const createHotel = async (req, res) => {
  const hotelInfo = req.body;
  try {
    const createdHotel = await Hotel.create(hotelInfo);

    return res.send({
      status: true,
      message: "Tạo thành công!",
      result: createdHotel,
    });
  } catch (error) {
    res.send(error);
  }
};

// Xóa hotel theo ID
const deleteHotelByID = async (req, res) => {
  const { id } = req.params;

  try {
    // Xem hotel đó có trong list Transaction không
    const countTransaction = await Transaction.countDocuments({ hotel: id });

    if (countTransaction > 0) {
      return res.send({
        status: false,
        message: "Khách sạn đã có giao dịch không được xóa!",
      });
    }

    // Nếu không có giao địch liên quan tiến hành xóa
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    if (!deletedHotel) {
      return res.send({
        status: false,
        message: "Không tìm thấy khách sạn!",
      });
    }

    return res.send({
      status: true,
      message: "Xóa thành công!",
      result: deletedHotel,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "Đã xảy ra lỗi khi xóa!",
    });
  }
};

// Update hotel
const updateHotel = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });

    // Nếu không tìm ra hotel để update
    if (!updatedHotel) {
      return res.send({
        status: false,
        message: `Không tìm thấy Hotel id = ${id}`,
        result: updatedHotel,
      });
    }

    // trả về két quả thành công
    return res.send({
      status: true,
      message: "Cập nhật hotel thành công!",
      result: updatedHotel,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "Lỗi trong quá trình update Hotel",
      result: error,
    });
  }
};

module.exports = {
  getListHotel,
  getHomePageListHotel,
  searchHotel,
  getHotelByID,
  getHotelBySearchInfo,
  createHotel,
  deleteHotelByID,
  updateHotel,
};
