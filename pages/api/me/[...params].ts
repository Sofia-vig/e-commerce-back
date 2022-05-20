import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { getOrderByUserId } from "controllers/orders";
import { User } from "models/user";
import * as yup from "yup";

let bodyPatchSchema = yup.object().shape({
  address: yup.string().required(),
});

const patchByAction = {
  address: authMiddleware(
    async (req: NextApiRequest, res: NextApiResponse, token) => {
      try {
        await bodyPatchSchema.validate(req.body);
      } catch (error) {
        res.status(400).send({ field: "body", error });
      }

      const user = new User(token.userId);
      await user.update({ address: req.body.address });
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
