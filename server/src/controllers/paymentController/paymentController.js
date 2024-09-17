import Stripe from "stripe";

const client_domain = process.env.CLIENT_DOMAIN;
const stripe = new Stripe(process.env.STRIPE_PRIVATE_API_KEY);

export const createCheckoutSession = async (req, res, next) => {
  try {
    const { products } = req.body;

    // Log products for debugging
    console.log("Products received:", products);

    // Validate products data
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid products data" });
    }

    const lineItems = products.map((item) => {
      const { product, quantity } = item;

      // Access fields from the nested product object
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
          unit_amount: Math.round(price * 100),
        },
        quantity: quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${client_domain}/user/payment/success`,
      cancel_url: `${client_domain}/user/payment/cancel`,
    });

    console.log("sessionId====", session.id);

    res.json({ success: true, sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Internal Server Error" });
  }
};
