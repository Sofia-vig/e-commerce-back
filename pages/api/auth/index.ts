import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "controllers/auth";
import * as yup from "yup";

let bodyPatchSchema = yup.object().shape({
  email: yup.string().required(),
});

export default methods({
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await bodyPatchSchema.validate(req.body);
    } catch (error) {
      res.status(400).send({ field: "body", error });
    }

    const result = await sendCode(req.body.email);
    res.send({ result });
  },
});
