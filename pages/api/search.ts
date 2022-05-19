import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { getOffsetAndLimit } from "lib/requests";
import { productsIndex } from "lib/algolia";
import { Product } from "models/product";

export default methods({
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const { limit, offset } = getOffsetAndLimit(req);
    const records = await Product.getByQuery(limit, offset, req.query.q);
    res.send({
      results: records.hits,
      pagination: {
        offset,
        limit,
        total: records.nbHits,
      },
    });
  },
});
