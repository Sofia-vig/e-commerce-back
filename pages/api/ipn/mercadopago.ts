import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { closeOrder } from "controllers/orders";

export default methods({
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, topic } = req.query;
    topic == "merchant_order" && (await closeOrder(id));
    res.status(200).send({ ok: true });
  },
});
