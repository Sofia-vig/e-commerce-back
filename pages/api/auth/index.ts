import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "controllers/auth";

export default methods({
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const result = await sendCode(req.body.email);
    res.send({ result });
  },
});
