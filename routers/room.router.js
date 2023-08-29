const express = require("express");
const {
  getListRoom,
  createRoom,
  deleteRoomByID,
  updateRoomByID,
} = require("../controllers/room.controller");
const { authorize } = require("../middlewares/authorize.middleware");
const roomRouter = express.Router();

// lấy danh sách room
roomRouter.get("/", getListRoom);

/**
 * Phần API cần phân quyền
 */

// Tạo room mới
roomRouter.post("/", authorize, createRoom);

// delete room by ID
roomRouter.delete("/:id", authorize, deleteRoomByID);

// update room by ID
roomRouter.put("/:id", authorize, updateRoomByID);

module.exports = roomRouter;
