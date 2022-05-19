import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { closeOrder } from "controllers/orders";

export default methods({
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, topic } = req.query;
    const done = await closeOrder(topic, id);
    done && res.status(200).send({ closed: true });
    !done && res.status(200).send("order not closed");
  },
});
