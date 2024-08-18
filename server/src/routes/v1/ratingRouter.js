
import express from 'express';
import { authUser } from '../../middlewares/authUser.js';
import { addOrUpdateRating, deleteRating, getProductRatings } from '../../controllers/ratingController/ratingController.js';
const router = express.Router();

router.post('/',authUser,addOrUpdateRating)
router.get('/:id',getProductRatings)
router.delete('/ratingid',authUser,deleteRating)

export default router;