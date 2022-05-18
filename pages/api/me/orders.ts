// Devuelve todas mis ordenes con sus status.

import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "lib/models/user";
import { authMiddleware } from "lib/middlewares";

export default methods({
  get: authMiddleware(
    async (req: NextApiRequest, res: NextApiResponse, token) => {}
  ),
});
