import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { syncAirtableWithAlgolia } from "models/product";

export default methods({
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    await syncAirtableWithAlgolia();
    res.send({ sync: true });
  },
});
