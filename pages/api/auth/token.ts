import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { Auth } from "models/auth";
import { generate } from "lib/jwt";

export default methods({
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const auth = await Auth.findByEmailAndCode(req.body.email, req.body.code);
    if (!auth) res.status(401).send({ message: "email or code incorrect" });
    const expired = auth.isCodeExpired();
    if (expired) res.status(401).send({ message: "code expired" });
    const token = generate({ userId: auth.data.userId });
    res.send({ token });
  },
});
