const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose.connect(
    "mongodb+srv://tdtrong07:TLYpzByp02mkAl4r@cluster0.zdjmdtn.mongodb.net/asm_02?retryWrites=true&w=majority"
  );
};

module.exports = { connectDB };
