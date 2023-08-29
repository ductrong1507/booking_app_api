const express = require("express");
const userRouter = require("./user.router");
const hotelRouter = require("./hotel.router");
const transactionRoter = require("./transaction.router");
const roomRouter = require("./room.router");

const rootRouter = express.Router();

rootRouter.use("/api/user", userRouter);
rootRouter.use("/api/hotel", hotelRouter);
rootRouter.use("/api/transaction", transactionRoter);
rootRouter.use("/api/room", roomRouter);

module.exports = rootRouter;
