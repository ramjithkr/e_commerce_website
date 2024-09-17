import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_API_KEY);
const client_domain = process.env.CLIENT_DOMAIN



export const createCheckoutSession = async (req, res, next) => {
  try {
    const { products } = req.body;

    if (!products) {
      return res.status(400).json({ message: "Products are required" });
    }
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${client_domain}/user/payment/success`,
      cancel_url: `${client_domain}/user/payment/cancel`,
    });

    res.json({ success: true, sessionId: session.id });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json(error.message || "internal server error");
  }
};
