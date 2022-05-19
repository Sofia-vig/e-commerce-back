// Recibe un email y encuentra/crea un user con ese email y le envía un código vía email.

import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "controllers/auth";

export default methods({
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const result = await sendCode(req.body.email);
    res.send({ result });
  },
});
