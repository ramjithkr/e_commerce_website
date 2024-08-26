import e from "express";
import {

  adminLogin,
  adminLogout,
  adminProfile,
  checkAdmin,
  getUsersList,
} from "../../controllers/adminController/adminController.js";
import { authAdmin } from "../../middlewares/authAdmin.js";
import { Admin } from "../../models/adminModels.js";
import { Product } from "./../../models/productModel.js";
const router = e.Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Hello from the admin route" });
});


router.post("/login", adminLogin);
router.post("/profile/:id", authAdmin, adminProfile);
router.post("/logout",authAdmin, adminLogout);
router.get("/getUserlist",authAdmin,getUsersList);

router.get("/singleUser");

router.get("/check-user", authAdmin, checkAdmin);

router.delete("/product/:productId/:id", authAdmin),
  async (req, res, next) => {
    try {
      const { id, ProductId } = req.params;

      const admin = await Admin.findById(id);
      const deleteProduct = await Product.findByIdAndDelete(ProductId);
      if (!deleteProduct) {
        return res
          .status(404)
          .json({ success: false, message: "product not found" });
      }
      res
        .status(200)
        .json({ success: true, message: "product deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  };

export default router;
