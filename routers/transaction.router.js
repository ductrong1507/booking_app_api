const express = require("express");
const {
  createTransaction,
  getTransactionList,
  getTransactionByTime,
  getTransactionByUserId,
} = require("../controllers/transaction.controller");
const transactionRoter = express.Router();

// Get all list
transactionRoter.get("/", getTransactionList);

// Tạo 1 transaction mới
transactionRoter.post("/", createTransaction);

// lấy transaction theo thời gian
transactionRoter.post("/transaction-by-time", getTransactionByTime);

// lấy danh sách transaction theo UserId
transactionRoter.get("/:userId", getTransactionByUserId);

module.exports = transactionRoter;
