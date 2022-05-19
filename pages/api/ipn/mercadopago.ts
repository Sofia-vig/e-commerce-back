import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { closeOrder } from "controllers/orders";

export default methods({
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, topic } = req.query;
    const response = await closeOrder(topic, id);
    res.status(200).send(response);
  },
});
