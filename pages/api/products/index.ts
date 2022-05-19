import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { getById } from "models/product";

export default methods({
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const product = await getById(req.query.id);
    res.status(200).send({ product });
  },
});
