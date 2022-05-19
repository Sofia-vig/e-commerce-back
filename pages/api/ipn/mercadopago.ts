import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { Order } from "models/order";

export default methods({
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, topic } = req.query;
    topic == "merchant_order" && (await Order.close(id));
    res.status(200).send({ ok: true });
  },
});
