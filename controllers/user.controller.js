const User = require("../models/User.model");

const getListUser = async (req, res) => {
  // Tạo option phân trang
  const page = +req.query.page || 1;
  const perPage = +req.query.perPage || null;

  try {
    /**
     *  lấy dữ liệu dạng phân trang và lọc theo những giao dịch mới nhất
     */
    const userList = await User.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ _id: -1 });

    // Đếm số lượng transaction
    const totalUser = await User.countDocuments();

    return res.send({
      status: true,
      message: "Lấy danh sách User thành công",
      result: userList,
      page,
      perPage,
      totalUser: totalUser,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "Lấy danh sách User có lỗi",
      result: error,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { userName, password, phoneNumber, email } = req.body;

    // kiểm tra userName đã tồn tại hay chưa
    const existedUser = await User.findOne({ userName });

    if (!existedUser) {
      const userCreated = await User.create({
        userName,
        password,
        phoneNumber,
        email,
      });
      return res.send({
        status: true,
        message: "Tạo user thành công!",
        result: userCreated,
      });
    } else {
      return res.send({
        status: false,
        message: "Username đã tồn tại!",
      });
    }

    // res.send("create");
  } catch (error) {
    res.send(error);
  }
};

const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName, password });

  // không tìm thấy user
  if (!user) {
    return res.send({
      status: false,
      message: "Sai thông tin đăng nhập",
    });
  }
  return res.send({
    status: true,
    message: "Đăng nhập thành công!",
    result: user,
  });
};

module.exports = {
  getListUser,
  createUser,
  loginUser,
};
