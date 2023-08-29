// Kiểm tra có phải admin không
const authorize = (req, res, next) => {
  let isAdmin;

  if (req.header("isAdmin") == "true") {
    isAdmin = true;
  } else {
    isAdmin = false;
  }

  if (isAdmin) {
    next();
  } else {
    res.send({
      status: false,
      message: "Bạn không có quyền Admin!",
    });
  }
};

module.exports = {
  authorize,
};
