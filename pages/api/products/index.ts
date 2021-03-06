import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllProducts } from "models/product";

export default methods({
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const products = await getAllProducts();
    res.status(200).send({ products });
  },
});
