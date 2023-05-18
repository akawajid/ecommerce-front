import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  await mongooseConnect();

  const { cartProducts } = req.body;
  return res.status(200).json(await Product.find({ _id: cartProducts }));
}
