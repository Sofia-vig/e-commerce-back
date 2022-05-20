import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { getUser, updateUser } from "controllers/users";

export default methods({
  get: authMiddleware(
    async (req: NextApiRequest, res: NextApiResponse, token) => {
      try {
        const user = await getUser(token.userId);
        res.status(200).send(user);
      } catch (error) {
        res.status(400).send(error);
      }
    }
  ),
  patch: authMiddleware(
    async (req: NextApiRequest, res: NextApiResponse, token) => {
      try {
        await updateUser(token.userId, req.body);
        res.status(200).send({ update: true });
      } catch (error) {
        res.status(400).send(error);
      }
    }
  ),
});
