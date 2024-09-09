import express from "express";
import { authUser } from "../../middlewares/authUser.js";
import {
  addProductToCart,
  getCartList,
  removeProductFromCart,
} from "./../../controllers/cartController/cartController.js";
const router = express.Router();

router.post("/add", authUser, addProductToCart);

router.post("/remove", authUser, removeProductFromCart);
router.get("/getcartlist/:id", authUser, getCartList);

export default router;
