const mongoose = require("mongoose");
const { Schema } = mongoose;

// Tạo Schema
const userSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, default: "" },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // quyền admin lúc nào cũng false
});

// tạo Model
const User = mongoose.model("User", userSchema);

module.exports = User;
