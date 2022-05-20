import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "controllers/auth";

export default methods({
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { token } = await getToken(req.body.email, req.body.code);
      res.status(200).send({ token });
    } catch (error) {
      res.status(400).send({ error });
    }
  },
});
