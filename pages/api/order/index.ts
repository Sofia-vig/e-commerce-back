import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { createOrderAndPreferences } from "controllers/orders";
import * as yup from "yup";

export default methods({
  post: authMiddleware(
    async (req: NextApiRequest, res: NextApiResponse, token) => {
      const { productId } = req.query as any;
      try {
        const { url } = await createOrderAndPreferences(
          productId,
          req.body,
          token.userId
        );
        res.status(200).send({ url });
      } catch (error) {
        res.status(400).send({ error });
      }
    }
  ),
});
