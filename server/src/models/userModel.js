import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
      default:
        "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png",
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wishlist", // Reference to Wishlist model
      },
    ],
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to Product model
      },
    ],
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart", // Reference to Cart model
      },
    ],
    checkoutSessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CheckoutSession", // Reference to CheckoutSession model
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export const User = mongoose.model("User", userSchema);
