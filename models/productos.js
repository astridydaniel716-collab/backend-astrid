const mongoose = require("mongoose");

const productosSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

module.exports = mongoose.model("productos", productosSchema);