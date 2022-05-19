import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "controllers/auth";

export default methods({
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await getToken(req.body.email, req.body.code);
    res.send(response);
  },
});
