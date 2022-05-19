import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmailToUser } from "lib/email";
import { getProductById } from "models/product";

export default methods({
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    const product = await getProductById("recZEG2Xvxq7zZmkN");
    const response = await sendEmailToUser("sofiavign@gmail.com", product);
    res.send(response);
  },
});
