import  express  from 'express';
import { authUser } from '../../middlewares/authUser.js';
import { addProductToWishlist, getWishlistDetails, removeProductFromWishlist } from '../../controllers/wishlistController.js/wishlistController.js';
const router  = express.Router();


router.post('/add',authUser,addProductToWishlist)
router.post('/add',authUser,removeProductFromWishlist)
router.post('/add',authUser,getWishlistDetails)


export default router;