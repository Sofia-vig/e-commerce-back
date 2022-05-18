/**
 * GET /search?q=query&offset=0&limit=10
Buscar productos en nuestra base de datos. Chequea stock y todo lo necesario. 
Este endpoint utiliza la técnica que vimos sobre Airtable y Algolia.
 * 
 */

import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { getOffsetAndLimit } from "lib/requests";
import { productsIndex } from "lib/algolia";

export default methods({
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const { limit, offset } = getOffsetAndLimit(req);
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
