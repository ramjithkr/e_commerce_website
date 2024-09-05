import express from "express";
import {
  createProduct,
  getProductDetails,
  getProductList,
  updatedProduct,
} from "../../controllers/productController/productController.js";
import { upload } from "./../../middlewares/uplodeMiddleware.js";
import { authUser } from "./../../middlewares/authUser.js";
import { authAdmin } from "../../middlewares/authAdmin.js";
const router = express.Router();

router.get("/productlist", authUser, getProductList);
router.get("/details/:id",authUser,getProductDetails)




router.post("/create", upload.single("image"), authAdmin, createProduct);
router.put("/update/:id", authAdmin, updatedProduct);

export default router;
