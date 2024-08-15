import express from "express";
import { createProduct, getProductList, updatedProduct } from "../../controllers/productController/productController.js";
import { upload } from './../../middlewares/uplodeMiddleware.js';
const router = express.Router();



router.get("/productList",getProductList);

router.post("/create",upload.single("image"),createProduct);

router.put("/update",updatedProduct);

router.delete("/delete");

export default router;
