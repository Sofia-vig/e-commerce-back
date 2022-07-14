import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { bodySchemaMiddleware } from "lib/middlewares";
import { sendCode } from "controllers/auth";
import * as yup from "yup";

let bodySchema = yup.object().shape({
  email: yup.string().required(),
});

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const result = await sendCode(req.body.email);
  res.send({ result });
}

export default methods({
  post: bodySchemaMiddleware(bodySchema, postHandler),
});
