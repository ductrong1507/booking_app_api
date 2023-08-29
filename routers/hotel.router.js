const express = require("express");
const {
  getListHotel,
  searchHotel,
  getHotelByID,
  getHomePageListHotel,
  getHotelBySearchInfo,
  createHotel,
  deleteHotelByID,
  updateHotel,
} = require("../controllers/hotel.controller");
const { authorize } = require("../middlewares/authorize.middleware");
const hotelRouter = express.Router();

// lấy danh sách hotel
hotelRouter.get("/", getListHotel);

// lấy danh sách hotel có thông tin như trang chủ
hotelRouter.get("/homepage", getHomePageListHotel);

// APi search option hotel
hotelRouter.post("/search", searchHotel);

// Lấy thông tin hotel đã lọc ra thông tin booked room
hotelRouter.post("/search-info", getHotelBySearchInfo);

// get hote by ID
hotelRouter.get("/:id", getHotelByID);

/**
 * Phần API cần phân quyền
 */

// Tạo 1 hotel mới
hotelRouter.post("/", authorize, createHotel);

// delete hote by ID
hotelRouter.delete("/:id", authorize, deleteHotelByID);

// delete hote by ID
hotelRouter.put("/:id", authorize, updateHotel);

module.exports = hotelRouter;
