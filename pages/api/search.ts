import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { getOffsetAndLimit } from "lib/requests";
import { productsIndex } from "lib/algolia";

export default methods({
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const { limit, offset } = getOffsetAndLimit(req);
    //chequear stock
    const records = await productsIndex.search(req.query.q as string, {
      page: offset > 1 ? Math.floor(offset / limit) : 0,
      hitsPerPage: limit,
    });
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
