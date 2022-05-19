import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "lib/models/user";
import { authMiddleware } from "lib/middlewares";

export default methods({
  get: authMiddleware(
    async (req: NextApiRequest, res: NextApiResponse, token) => {
      // Devuelve info del user asociado a ese token
      const user = new User(token.userId);
      await user.pull();
      res.send(user.data);
    }
  ),
  patch: authMiddleware(
    async (req: NextApiRequest, res: NextApiResponse, token) => {
      const user = new User(token.userId);
      await user.update(req.body);
    }
  ),
});
