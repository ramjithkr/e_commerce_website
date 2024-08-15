import express from "express";
const router = express.Router();

import {
  checkUser,
  userCreate,
  userLogin,
  userLogout,
  userProfile,
} from "../../controllers/userControllers/userController.js";
import { authUser } from "../../middlewares/authUser.js";


router.post("/create", userCreate);
router.post("/login", userLogin);
router.post("/profile/:id", authUser, userProfile);
router.post("/logout", userLogout)
router.get("/check-user", authUser, checkUser);


export default router;
