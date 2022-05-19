import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmailToUser } from "lib/email";
import { getProductById } from "models/product";
import { Order } from "models/order";
import { User } from "models/user";

export default methods({
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    // const orderInstance = new Order("1cu6zyXIxlXQUKgwV8Fk");
    // await orderInstance.pull();
    // const user = new User(orderInstance.data.userId);
    // await user.pull();
    // const product = await getProductById(orderInstance.data.productId);
    // await sendEmailToUser(user.data.email, product);
    res.send({});
  },
});
