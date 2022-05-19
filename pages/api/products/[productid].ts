import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";

export default methods({
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).send({ product: "id" });
  },
});
