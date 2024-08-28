import e from "express";
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

const router = e.Router();

router.post("/login", adminLogin);
router.post("/profile/:id", authAdmin, adminProfile);
router.post("/logout", authAdmin, adminLogout);
router.get("/getuserlist", authAdmin, getUsersList);
router.get("/getsingleuser/:id", authAdmin, getSingleUser);
router.get("/getallcarts", authAdmin, getAllUsersCarts);
router.get("/getCart/:id", authAdmin, getSingleUserCart);
router.get("/getAllProducts", authAdmin, getAllProducts);
router.delete("/deleteProduct/:id", authAdmin, deleteProduct);
router.get("/reviews", authAdmin, getAllReviews);
router.get("/check-user", authAdmin, checkAdmin);

export default router;
