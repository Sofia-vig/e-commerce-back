import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "controllers/auth";
import * as yup from "yup";

let bodyPatchSchema = yup.object().shape({
  email: yup.string().required(),
  code: yup.number().required(),
});

export default methods({
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await bodyPatchSchema.validate(req.body);
    } catch (error) {
      res.status(400).send({ field: "body", error });
    }

    try {
      const { token } = await getToken(req.body.email, req.body.code);
      res.status(200).send({ token });
    } catch (error) {
      res.status(400).send({ error });
    }
  },
});
