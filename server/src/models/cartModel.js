import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Capitalized 'User'
    required: true,
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Capitalized 'Product'
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  }],
}, {
  timestamps: true, 
});

export const Cart = mongoose.model('Cart', cartSchema); // Capitalized 'Cart'
