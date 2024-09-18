

import express from "express";
import { authUser } from "../../middlewares/authUser.js";
import { createCheckoutSession, sessionStatus } from "../../controllers/paymentController/paymentController.js";

const router = express.Router();

router.post('/create-checkout-session',authUser,createCheckoutSession)

router.get("/session-status",authUser,sessionStatus)


export default router;
