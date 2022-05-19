import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { Order } from "models/order";
import { authMiddleware } from "lib/middlewares";

export default methods({
  get: authMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
    const order = new Order(req.query.orderId);
    await order.pull();
    const orderData = order.get();
    res.status(200).send({ orderData });
  }),
});
