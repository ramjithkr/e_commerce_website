import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    // Add more validation if needed, e.g., regex for email format
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Ensure this meets your security requirements
  },
  mobile: {
    type: String,
    required: true,
    // Consider adding validation for mobile number format
  },
  profile: {
    type: String,
    default: 'https://static-00.iconduck.com/assets.00/profile-circle-icon-256x256-cm91gqm2.png',
  },
  products: [{
    type: mongoose.Types.ObjectId,
    ref: 'Product',
  }],
}, {
  timestamps: true,
});

// Create and export the User model
export const User = mongoose.model('User', userSchema);
