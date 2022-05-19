import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "models/product";

export default methods({
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const product = new Product(req.query.id);
    await product.pull();
    const productData = product.get();
    res.status(200).send({ productData });
  },
});
