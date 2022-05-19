import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { base } from "lib/airtable";
import { productsIndex } from "lib/algolia";

export default methods({
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    base("Funkos")
      .select({
        pageSize: 10,
      })
      .eachPage(
        async function page(records, fetchNextPage) {
          const objects = records.map((r) => {
            return {
              ...r.fields,
              objectID: r.id,
            };
          });
          await productsIndex.saveObjects(objects);
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
          res.send({ done: true });
        }
      );
  },
});
