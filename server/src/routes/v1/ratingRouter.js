import express from "express";
import { authUser } from "../../middlewares/authUser.js";
import {
  addOrUpdateRating,
  deleteRating,
  getProductRatings,
} from "../../controllers/ratingController/ratingController.js";

const router = express.Router();

router.post("/addandupdate", authUser, addOrUpdateRating);
router.get("/:productid", authUser, getProductRatings);
router.delete("/:ratingId", authUser, deleteRating);

export default router;
