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

export const querySchemaMiddleware = (querySchema, handler) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      await querySchema.validate(req.query);
      handler(req, res);
    } catch (error) {
      res.status(400).send({ field: "query", error });
    }
  };
};

export const bodySchemaMiddleware = (bodySchema, handler) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      await bodySchema.validate(req.body);
      handler(req, res);
    } catch (error) {
      res.status(400).send({ field: "body", error });
    }
  };
};
