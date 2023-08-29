const express = require("express");
const {
  getListUser,
  createUser,
  loginUser,
} = require("../controllers/user.controller");
const userRouter = express.Router();

// Get userList
userRouter.get("/", getListUser);

// create user
userRouter.post("/", createUser);

// login user
userRouter.post("/login", loginUser);

module.exports = userRouter;
