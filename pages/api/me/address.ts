import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "lib/models/user";
import { authMiddleware } from "lib/middlewares";

export default methods({
  patch: authMiddleware(
    async (req: NextApiRequest, res: NextApiResponse, token) => {
      const user = new User(token.userId);
      await user.pull();
      user.updateAddress(req.body.address);
      await user.push();
    }
  ),
});
