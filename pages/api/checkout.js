import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    await mongooseConnect();

    const {
      name,
      email,
      city,
      postalCode,
      address,
      streetAddress,
      country,
      cartProducts,
    } = req.body;
    const uniqueProducts = [...new Set(cartProducts)];
    const productInfo = await Product.find({ _id: uniqueProducts });
    const productsQty = {};
    cartProducts.forEach(
      (productId) =>
        (productsQty[productId] = (productsQty[productId] || 0) + 1)
    );

    const line_items = [];
    for (const product of productInfo) {
      const qty = productsQty[product._id] || 1;
      line_items.push({
        quantity: qty,
        price_data: {
          currency: "USD",
          product_data: {
            name: product.title,
          },
          unit_amount: product.price * 100,
        },
      });
    }

    const orderDoc = await Order.create({
      name,
      email,
      city,
      postalCode,
      address,
      streetAddress,
      country,
      line_items,
      paid: false,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
      cancel_url: `${process.env.PUBLIC_URL}/cart?canceled=1`,
      metadata: { orderId: orderDoc?._id.toString() },
    });

    res.json({ url: session?.url });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
