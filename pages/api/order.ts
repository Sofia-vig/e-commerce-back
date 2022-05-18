/*POST /order?productId={id}
    Genera una compra en nuestra base de datos y además genera una orden de pago en MercadoPago. 
    Devuelve una URL de MercadoPago a donde vamos a redigirigir al user para que pague y el orderId.
    res.status(200).send({ order: "post" });*/

import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { Order } from "lib/models/order";
import { authMiddleware } from "lib/middlewares";
import { createPreference } from "lib/mercadopago";

const products = {
  "1234": {
    title: "Mate",
    price: 100,
    description: "AAAA",
  },
};

export default methods({
  post: authMiddleware(
    async (req: NextApiRequest, res: NextApiResponse, token) => {
      const { productId } = req.query as any;
      const product = products[productId];
      if (product) {
        const order = await Order.createNewOrder({
          aditionalInfo: req.body,
          productId,
          userId: token.userId,
          status: "pending",
        });
        const pref = await createPreference({
          items: [
            {
              title: product.title,
              description: product.description,
              picture_url: "http://www.myapp.com/myimage.jpg",
              category_id: "car_electronics",
              quantity: 1,
              currency_id: "ARS",
              unit_price: product.price,
            },
          ],
          back_urls: {
            success: "https://google.com",
          },
          external_reference: order.id,
          notification_url:
            "https://e-commerce-back-omega.vercel.app/api/ipn/mercadopago",
        });
        res.send({ url: pref.init_point });
      } else {
        res.status(404).send({ message: "El producto no existe" });
      }
    }
  ),
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    /*
    GET /order/{orderId}
    Devuelve una orden con toda la data incluyendo el estado de la orden.
    */
    res.status(200).send({ order: "post" });
  },
});
