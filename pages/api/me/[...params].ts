import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { updateUserAddress } from "controllers/users";
import { getOrderByUserId } from "controllers/orders";

const patchByAction = {
  address: authMiddleware(
    async (req: NextApiRequest, res: NextApiResponse, token) => {
      await updateUserAddress(token.userId, req.body.address);
      res.send({ updateAddress: true });
    }
  ),
};

const getByAction = {
  orders: authMiddleware(
    async (req: NextApiRequest, res: NextApiResponse, token) => {
      const myOrders = await getOrderByUserId(token.userId);
      res.send({ myOrders });
    }
  ),
};

export default methods({
  async patch(req: NextApiRequest, res: NextApiResponse) {
    const action = req.query.params[0];
    return patchByAction[action](req, res);
  },
  async get(req: NextApiRequest, res: NextApiResponse) {
    const action = req.query.params[0];
    return getByAction[action](req, res);
  },
});
