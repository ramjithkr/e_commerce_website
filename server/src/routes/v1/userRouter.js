import express from "express";
import {
  checkUser,
  userCreate,
  userLogin,
  userLogout,
  userProfile,
} from "../../controllers/userControllers/userController.js";
import { authUser } from "../../middlewares/authUser.js";

const router = express.Router();

router.post("/create", userCreate);
router.post("/login", userLogin);
router.get("/profile", authUser, userProfile);
router.get("/check-user", authUser, checkUser);
router.post("/logout", userLogout);

export default router;
