import express from "express";
import { authUser } from "../../middlewares/authUser.js";
import { addProductToCart, getCartDetails, removeProductFromCart } from './../../controllers/cartController/cartController.js';
const router = express.Router();

router.post("/add",authUser,addProductToCart);

router.post("/remove",authUser,removeProductFromCart);

router.post("/customerId",authUser,getCartDetails);

export default router;
