import express from "express";
import { authUser } from "../../middlewares/authUser.js";
import {
  addProductToCart,
  getCartList,
} from "../../controllers/cartController/cartController.js";

const router = express.Router();

// Add product to cart
router.post(`/add/:id`, authUser, addProductToCart);

router.get("/cartdetails", authUser, getCartList);

// Additional routes...
export default router;
