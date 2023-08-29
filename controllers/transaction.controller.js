const Transaction = require("../models/Transaction.model");
const Hotel = require("../models/Hotel.model");

// Lấy tất cả danh sách
const getTransactionList = async (req, res) => {
  // Tạo option phân trang
  const page = +req.query.page || 1;
  const perPage = +req.query.perPage || null;

  try {
    /**
     *  lấy dữ liệu dạng phân trang và lọc theo những giao dịch mới nhất
     */
    const transactionList = await Transaction.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ _id: -1 })
      .populate("hotel");

    // Đếm số lượng transaction
    const totalTransaction = await Transaction.countDocuments();

    // tính tổng số lượng tiền từ các transaction
    const totalAmount = await Transaction.aggregate([
      { $group: { _id: null, amount: { $sum: "$price" } } },
    ]);

    return res.send({
      status: true,
      message: "Lấy danh sách Giao dịch thành công",
      result: transactionList,
      page,
      perPage,
      totalTransaction: totalTransaction,
      totalAmount: totalAmount[0].amount,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "Lấy danh sách Giao dịch có lỗi",
      result: error,
    });
  }
};

// Tạo 1 Transaction
const createTransaction = async (req, res) => {
  const {
    userId,
    userName,
    hotel,
    room,
    dateStart,
    dateEnd,
    price,
    payment,
    status,
  } = req.body;

  // Xử lý ngày tháng start 14h, end 12h30
  const startDate = new Date(dateStart);
  startDate.setHours(14, 0, 0);

  const endDate = new Date(dateEnd);
  endDate.setHours(12, 30, 0);
  try {
    const newTransaction = await Transaction.create({
      userId,
      userName,
      hotel,
      room,
      dateStart: startDate,
      dateEnd: endDate,
      price,
      payment,
      status,
    });

    return res.send({
      status: true,
      message: "Đặt phòng thành công!",
      result: newTransaction,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "Đặt phòng thất bại, hãy thử lại sau!",
      result: error,
    });
  }
};

// get Transaction by Userid
const getTransactionByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactionByUser = await Transaction.find({
      userId,
    }).populate({
      path: "hotel", // Trường liên kết với collection Hotel
      populate: {
        path: "rooms", // Trường liên kết với collection Room trong collection Hotel
        model: "Room", // Tên model của collection Room
      },
    });

    return res.send({
      status: true,
      message: "Lấy danh sách Giao dịch theo User thành công!",
      result: transactionByUser,
      userId: userId,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "Lấy danh sách Giao dịch theo User thất bại!",
      result: error,
      userId: userId,
    });
  }
};

// get những transaction theo thời gian
const getTransactionByTime = async (req, res) => {
  const { dateStart, dateEnd, hotelId } = req.body;

  // Xử lý ngày tháng start 14h, end 12h30
  const startDate = new Date(dateStart);
  startDate.setHours(14, 0, 0);

  const endDate = new Date(dateEnd);
  endDate.setHours(12, 30, 0);

  // Gọi database để lấy dữ liệu
  try {
    /**
     * - lấy tất cả transaction có dateStart nằm trong khoảng ngày bắt đầu + ngày kết thúc
     * hoặc dateEnd nằm trong khoảng ngày bắt đầu + ngày kết thúc
     * - Sau đó chỉ lấy trường room
     */
    const transactionList = await Transaction.find(
      {
        $or: [
          { dateStart: { $gte: startDate, $lte: endDate } },
          { dateEnd: { $gte: startDate, $lte: endDate } },
        ],
      },
      "room dateStart dateEnd"
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

module.exports = {
  getTransactionList,
  createTransaction,
  getTransactionByUserId,
  getTransactionByTime,
};
