import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { Order } from "models/order";

export default methods({
  get: authMiddleware(
    async (req: NextApiRequest, res: NextApiResponse, token) => {
      const myOrders = await Order.getMyOrders(token.userId);
      res.send({ myOrders });
    }
  ),
});
