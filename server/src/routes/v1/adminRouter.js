import express from "express"; // Use 'express' instead of 'e'
import {
  adminLogin,
  adminLogout,
  adminProfile,
  checkAdmin,
  deleteProduct,
  getAllProducts,
  getAllReviews,
  getAllUsersCarts,
  getSingleUser,
  getSingleUserCart,
  getUsersList,
} from "../../controllers/adminController/adminController.js";
import { authAdmin } from "../../middlewares/authAdmin.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Hello from the admin route" });
});

router.post("/login", adminLogin);
router.post("/profile/:id", authAdmin, adminProfile);
router.post("/logout", authAdmin, adminLogout);
router.get("/getUserlist", authAdmin, getUsersList);
router.get("/singleUser/:id", authAdmin, getSingleUser);
router.get("/getAllCarts", authAdmin, getAllUsersCarts);
router.get("/getCart/:id", authAdmin, getSingleUserCart);
router.get("/getAllProducts", authAdmin, getAllProducts);
router.delete("/deleteProduct/:id", authAdmin, deleteProduct);
router.get("/reviews", authAdmin, getAllReviews);
router.get("/check-user", authAdmin, checkAdmin);

export default router; 
