import type { NextApiRequest, NextApiResponse } from "next";
import parseToken from "parse-bearer-token";
import { decode } from "lib/jwt";

export const authMiddleware = (callback) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const token = parseToken(req);
    !token && res.status(401).send({ message: "no hay token" });
    const decodedToken = decode(token);
    if (decodedToken) {
      callback(req, res, decodedToken);
    } else {
      res.status(401).send({ message: "token incorrecto" });
    }
  };
};
