const Room = require("../models/Room.model");
const Hotel = require("../models/Hotel.model");
const Transaction = require("../models/Transaction.model");

// Lấy list room
const getListRoom = async (req, res) => {
  // Tạo option phân trang
  const page = +req.query.page || 1;
  const perPage = +req.query.perPage || null;
  try {
    /**
     *  lấy dữ liệu dạng phân trang và lọc theo room
     */
    const roomList = await Room.find()
      .skip((page - 1) * perPage)
      .limit(perPage);

    // Đếm số lượng room
    const totalRoom = await Room.countDocuments();
    return res.send({
      status: true,
      message: "Lấy danh sách Room thành công!",
      result: roomList,
      page,
      perPage,
      totalRoom,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "Có lỗi trong quá trình lấy thông tin room!",
      result: error,
    });
  }
};

// tạo room mới
const createRoom = async (req, res) => {
  const { title, price, maxPeople, desc, roomNumbers } = req.body;

  try {
    const newRoom = await Room.create({
      title,
      price,
      maxPeople,
      desc,
      roomNumbers,
    });

    return res.send({
      status: true,
      message: "Tạo room thành công!",
      result: newRoom,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "Có lỗi trong quá trình tạo room!",
      result: error,
    });
  }
};

// Xóa room theo ID
const deleteRoomByID = async (req, res) => {
  const { id } = req.params;

  try {
    // lấy ra thông tin room đó từ DB
    const roomDetail = await Room.findById(id);
    if (!roomDetail) {
      return res.send({
        status: false,
        message: `Không tìm thấy room có id = ${id}`,
      });
    }

    // kiểm tra xem room đó ở ks nào
    const hotelContainRoom = await Hotel.find({
      rooms: { $in: [id] },
    });

    // Tạo 1 array id hotel để kiểm ra có những giao dịch nào
    const idHotelArr = hotelContainRoom.map((hotel) => hotel._id.toString());

    // Xem list hotel đó có trong Transaction nào không
    const transactionHaveHotel = await Transaction.find({
      hotel: { $in: [...idHotelArr] },
    });

    // Kiểm tra xem room đang tìm có nằm trong các giao dịch hiện hữu không
    const isExist = roomDetail.roomNumbers.some((numberToCheck) => {
      return transactionHaveHotel.some((item) => {
        return item.room.includes(numberToCheck);
      });
    });

    if (isExist) {
      return res.send({
        status: false,
        message: `Không thể xóa vì room đã tồn tại trong giao dịch`,
      });
    } else {
      const deletedRoom = await Room.findByIdAndDelete(id);
      return res.send({
        status: true,
        message: `Xóa room thành công!`,
        result: deletedRoom,
      });
    }
  } catch (error) {
    return res.send({
      status: false,
      message: "Đã xảy ra lỗi khi xóa!",
      result: error,
    });
  }
};

// update room theo ID
const updateRoomByID = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });

    // Nếu không tìm ra Room để update
    if (!updatedRoom) {
      return res.send({
        status: false,
        message: `Không tìm thấy Room id = ${id}`,
        result: updatedRoom,
      });
    }

    return res.send({
      status: true,
      message: "Cập nhật Room thành công!",
      result: updatedRoom,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "Lỗi trong quá trình update Room!",
      result: error,
    });
  }
};

module.exports = {
  getListRoom,
  createRoom,
  deleteRoomByID,
  updateRoomByID,
};
