import express from "express";
import { authUser } from "../../middlewares/authUser.js";
import {
  addProductToCart,
  getCartList,
  removeCartItem,
 
} from "../../controllers/cartController/cartController.js";

const router = express.Router();

// Add product to cart
router.post(`/add/:id`, authUser, addProductToCart);

router.get("/cartdetails", authUser, getCartList);

router.delete("/remove/:id", authUser, removeCartItem);

// Additional routes...
export default router;
