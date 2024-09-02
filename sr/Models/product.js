import mongoose from "mongoose";

const productData = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,  // Changed from String to Number for better numeric operations
    required: true
  }
});

const product = mongoose.model("product", productData);

export default product;
