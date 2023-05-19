import { buffer } from "micro";
import Stripe from "stripe";

const stripe = new Stripe(process.env.SRTRIPE_SK);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err) {
      console.log(`Error: ${errorMessage}`);
    }

    if (event.type === "charge.succeeded") {
      const charge = event.data.object;
      const { metadata } = event.data.object;
      console.log(event.data);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    res.send();

  } else {
    res.status(405).json("Method Not Allowed");
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
