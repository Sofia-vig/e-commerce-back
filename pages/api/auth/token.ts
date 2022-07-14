import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { bodySchemaMiddleware } from "lib/middlewares";
import { getToken } from "controllers/auth";
import * as yup from "yup";

let bodySchema = yup.object().shape({
  email: yup.string().required(),
  code: yup.number().required(),
});

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { token } = await getToken(req.body.email, req.body.code);
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ error });
  }
}

export default methods({
  post: bodySchemaMiddleware(bodySchema, postHandler),
});
