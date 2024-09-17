

import express from "express";
import { authUser } from "../../middlewares/authUser.js";
import { createCheckoutSession } from "../../controllers/paymentController/paymentController.js";

const router = express.Router();

router.post('/create-checkout-session',createCheckoutSession)


export default router;
