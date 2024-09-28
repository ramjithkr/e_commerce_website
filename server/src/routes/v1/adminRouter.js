import e from "express";
import { adminCreate, adminLogin, adminLogout, adminProfile, checkAdmin, deleteProduct, deleteUser, getAdminProductDetails, getAllProducts, getAllUserOrders, getAllUsersCarts, getSingleUserCart, getUsersList } from "../../controllers/adminController/adminController.js";
import { authAdmin } from "../../middlewares/authAdmin.js";

const router = e.Router();

router.post("/cerate", adminCreate);

router.post("/login", adminLogin);
router.get("/profile", authAdmin, adminProfile);
router.post("/logout", authAdmin, adminLogout);
router.get("/getAllProducts", authAdmin, getAllProducts);
router.get("/details/:id", authAdmin, getAdminProductDetails);
router.delete("/deleteProduct/:id", authAdmin, deleteProduct);
router.get("/getuserlist", authAdmin, getUsersList);

router.delete("/deleteUser/:id", authAdmin, deleteUser);

router.get("/getuserodears", authAdmin, getAllUserOrders);

router.get("/getallcarts", authAdmin, getAllUsersCarts);

router.get("/getCart/:id", authAdmin, getSingleUserCart);

router.get("/check-admin", authAdmin, checkAdmin);

export default router;
