import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "./../../controllers/wishlistController.js/wishlistController.js";

const router = express.Router();

router.post("/add", addToWishlist);




router.post("/remove", removeFromWishlist);

router.get("/getwishlist/:id", getWishlist);



export default router;
