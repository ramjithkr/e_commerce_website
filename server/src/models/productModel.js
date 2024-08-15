import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Trim whitespace
  },
  desc: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    default: "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
  },
  brand: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensure price is non-negative
  },
  category: {
    type: String,
    trim: true,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0, // Ensure stock is non-negative
  },
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating', // Reference to the Rating or Review model
  }],
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

export const Product = mongoose.model('Product', ProductSchema);
