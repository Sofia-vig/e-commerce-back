import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware, querySchemaMiddleware } from "lib/middlewares";
import { createOrderAndPreferences } from "controllers/orders";
import * as yup from "yup";

let querySchema = yup.object().shape({
  productId: yup.string().required(),
});

async function postHandler(req: NextApiRequest, res: NextApiResponse, token) {
  const { productId } = req.query as any;
  try {
    const { url, orderId } = await createOrderAndPreferences(
      productId,
      req.body,
      token.userId
    );
    res.status(200).send({ url, orderId });
  } catch (error) {
    res.status(400).send({ error });
  }
}

const handler = methods({
  post: authMiddleware(postHandler),
});

export default querySchemaMiddleware(querySchema, handler);
