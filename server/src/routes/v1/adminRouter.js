import e from "express";
import {
  adminLogin,
  adminLogout,
  adminProfile,
  checkAdmin,
  deleteProduct,
  deleteUser,
  getAdminProductDetails,
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
router.get("/profile", authAdmin, adminProfile);
router.post("/logout", authAdmin, adminLogout);
router.get("/getAllProducts", authAdmin, getAllProducts);
router.get("/details/:id", authAdmin, getAdminProductDetails);
router.delete("/deleteProduct/:id", authAdmin, deleteProduct);
router.get("/getuserlist", authAdmin, getUsersList);
router.delete("/deleteuser", authAdmin, deleteUser);




router.get("/getallcarts", authAdmin, getAllUsersCarts);
router.get("/getCart/:id", authAdmin, getSingleUserCart);

router.get("/check-admin", authAdmin, checkAdmin);

export default router;
