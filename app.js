const express = require("express");
const cors = require("cors");
const rootRouter = require("./routers/index.router");
const { connectDB } = require("./utils/database");
const User = require("./models/User.model");
const Hotel = require("./models/Hotel.model");
const Room = require("./models/Room.model");
const Transaction = require("./models/Transaction.model");

// import dummy data
const { hotelDummy, roomDummy } = require("./DummyData/DummyData");

const app = express();
const port = 5000;

// các thiết lập cơ bản
app.use(express.json());
app.use(cors());
app.use(rootRouter);

// test create server
app.get("/", async (req, res) => {
  const user = await User.find();

  const hotel = await Hotel.find();
  const room = await Room.find();
  const transaction = await Transaction.find();

  res.send({
    message: "Server is running",
    data: {
      user,
      hotel,
      room,
      transaction,
    },
  });
});

app.listen(port, () => {
  connectDB()
    .then(async (result) => {
      console.log("Connected!");
      // insert dummy data khi db chưa có gì
      const existHotel = await Hotel.countDocuments();
      const existRoom = await Room.countDocuments();

      console.log("existHotel", existHotel);
      if (existHotel == 0) {
        await Hotel.insertMany(hotelDummy);
        console.log("Nạp dữ liệu Hotel dummy thành công!");
      }

      console.log("existRoom", existRoom);
      if (existRoom == 0) {
        await Room.insertMany(roomDummy);
        console.log("Nạp dữ liệu Room dummy thành công!");
      }
    })
    .catch((error) => console.log(error));
  console.log(`Booking app listening on port ${port}`);
});
