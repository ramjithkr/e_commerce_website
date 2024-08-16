import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },
  review: {
    type: String,
    minLength: 20,
    maxLength: 200,
    required: true,
  }
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

export const Rating = mongoose.model('Rating', ratingSchema);