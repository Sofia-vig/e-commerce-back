import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";

export default methods({
  patch: async (req: NextApiRequest, res: NextApiResponse, token) => {
    res.send({ test: "ok" });
  },
});
