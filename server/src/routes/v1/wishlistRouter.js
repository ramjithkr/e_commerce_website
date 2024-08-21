import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "./../../controllers/wishlistController.js/wishlistController.js";
import { authUser } from "../../middlewares/authUser.js";

const router = express.Router();

router.post("/add", authUser, addToWishlist);
router.delete("/remove/:id/:productId", authUser, removeFromWishlist);
router.get("/getwishlist/:id", authUser, getWishlist);

export default router;
