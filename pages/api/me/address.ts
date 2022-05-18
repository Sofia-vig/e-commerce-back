// Permite modificar un dato puntual del usuario al que pertenezca el token usado en el request.
//  En este caso el objeto que describe la dirección.

import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "lib/models/user";
import { authMiddleware } from "lib/middlewares";

export default methods({
  patch: authMiddleware(
    async (req: NextApiRequest, res: NextApiResponse, token) => {}
  ),
});
