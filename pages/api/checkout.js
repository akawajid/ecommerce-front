import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    await mongooseConnect();

    const { products } = req.body;
    const uniqueProducts = [new Set(products.split(','))];
    const productInfo = await Product.find({ _id: uniqueProducts });

    const lineItems = [];
    for (const product in productInfo) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: product.title,
        },
        unit_amount: product.price,
      });
    }

    res.json({ line_items: lineItems });
  }

  res.status(403).json("Invalid request");
}
