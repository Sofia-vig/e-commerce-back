import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "models/user";
import { authMiddleware } from "lib/middlewares";
import { Order } from "models/order";

const patchByAction = {
  address: authMiddleware(
    async (req: NextApiRequest, res: NextApiResponse, token) => {
      const user = new User(token.userId);
      await user.pull();
      user.updateAddress(req.body.address);
      await user.push();
      res.send({ updateAddress: true });
    }
  ),
};

const getByAction = {
  orders: authMiddleware(
    async (req: NextApiRequest, res: NextApiResponse, token) => {
      const myOrders = await Order.getMyOrders(token.userId);
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
