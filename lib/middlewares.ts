import type { NextApiRequest, NextApiResponse } from "next";
import parseToken from "parse-bearer-token";
import { decode } from "lib/jwt";
import Cors from "cors";

export const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
  })
);
export default function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

export const authMiddleware = (callback) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    await cors(req, res);
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
    await cors(req, res);
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
    await cors(req, res);
    try {
      await bodySchema.validate(req.body);
      handler(req, res);
    } catch (error) {
      res.status(400).send({ field: "body", error });
    }
  };
};
