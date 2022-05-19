import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { getOffsetAndLimit } from "lib/requests";
import { getProductsByQuery } from "models/product";

export default methods({
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const { limit, offset } = getOffsetAndLimit(req);
    const products = await getProductsByQuery(
      limit,
      offset,
      req.query.q as string
    );
    res.send({ products });
  },
});
