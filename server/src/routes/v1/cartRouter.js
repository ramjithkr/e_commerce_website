import express from "express";
import { authUser } from "../../middlewares/authUser.js";
import {
  addProductToCart,
  cartRemoveAll,
  getCartList,
  removeCartItem,
  updateCart,
 
} from "../../controllers/cartController/cartController.js";

const router = express.Router();

// Add product to cart
router.post(`/add/:id`, authUser, addProductToCart);

router.get("/cartdetails", authUser, getCartList);

router.delete("/remove/:id", authUser, removeCartItem);

router.patch("/update/:id", authUser, updateCart)

router.delete("/removeall", authUser, cartRemoveAll);


export default router;
