import Stripe from "stripe";

import { Session } from "../../models/sectionModel.js";
import { User } from "./../../models/userModel.js";

const client_domain = process.env.CLIENT_DOMAIN;
const stripe = new Stripe(process.env.STRIPE_PRIVATE_API_KEY);

export const createCheckoutSession = async (req, res, next) => {
  try {
    const userid = req.user; // Assumes req.user is populated with the user information
    const { products } = req.body;

    if (!userid || !products) {
      return res.status(400).json({ error: "User ID or products missing" });
    }

    const user = await User.findOne({ email: userid.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User ID:", user._id);

    // Validate products data
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid products data" });
    }

    // Prepare line items for Stripe
    const lineItems = products.map((item) => {
      const { product, quantity } = item;
      const { title, image, price } = product;

      if (!title || !price || !quantity) {
        console.error("Missing product fields:", product);
        throw new Error("Product data missing fields");
      }

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: title,
            images: [image],
          },
          unit_amount: Math.round(price * 100), // Stripe expects amount in cents
        },
        quantity: quantity,
      };
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_DOMAIN}/user/payment/success`,
      cancel_url: `${process.env.CLIENT_DOMAIN}/user/payment/cancel`,
    });

    // Log the session ID
    console.log("Stripe Session ID:", session.id);

    // Create new session document
    const newSession = new Session({
      sessionId: session.id,
      user: user._id,
      products: products.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      amount_total: session.amount_total,
      currency: session.currency || "inr",
      payment_status: "pending",
    });

    try {
      await newSession.save();

      res.json({ success: true, sessionId: session.id });
    } catch (err) {
      console.error("Error saving session to the database:", err);
      res.status(500).json({ error: "Failed to save session" });
    }

  } catch (error) {
    console.error("Error creating checkout session:", error);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Internal Server Error" });
  }
};





export const sessionStatus = async (req, res, next) => {
  try {
    const sessionId = req.query.session_id;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    res.send({
      status: session?.status,
      customer_email: session?.customer_details?.email,
      session,
    });
  } catch (error) {
    res
      .status(error?.statusCode || 500)
      .json(error.message || "internal server error");
  }
};
