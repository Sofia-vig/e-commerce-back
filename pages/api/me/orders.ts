import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "models/user";
import { authMiddleware } from "lib/middlewares";

export default methods({
  get: authMiddleware(
    async (req: NextApiRequest, res: NextApiResponse, token) => {}
  ),
});
