import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { createOrderAndPreferences } from "controllers/orders";

export default methods({
  post: authMiddleware(
    async (req: NextApiRequest, res: NextApiResponse, token) => {
      const { productId } = req.query as any;
      const response = await createOrderAndPreferences(
        productId,
        req.body,
        token.userId
      );
      res.send(response);
    }
  ),
});
