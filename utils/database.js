const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose.connect(
    "mongodb+srv://<username>:<password>@cluster0.zdjmdtn.mongodb.net/asm_02?retryWrites=true&w=majority"
  );
};

module.exports = { connectDB };
