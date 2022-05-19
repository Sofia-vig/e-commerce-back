import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { getProductById } from "models/product";

export default methods({
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const product = await getProductById(req.query.id as string);
    res.status(200).send({ product });
  },
});
