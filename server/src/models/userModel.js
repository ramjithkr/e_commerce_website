import mongoose from 'mongoose';

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

  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  mobile: {
    type: String,
    required: true,
  
  },
  profile: {
    type: String,
    default: 'https://static-00.iconduck.com/assets.00/profile-circle-icon-256x256-cm91gqm2.png',
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wishlist',
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
}, {
  timestamps: true,
});

// Create and export the User model
export const User = mongoose.model('User', userSchema);
