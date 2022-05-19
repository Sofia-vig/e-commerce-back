import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { Order } from "models/order";
import { authMiddleware } from "lib/middlewares";
import { createPreference } from "lib/mercadopago";
import { Product } from "models/product";

export default methods({
  post: authMiddleware(
    async (req: NextApiRequest, res: NextApiResponse, token) => {
      const { productId } = req.query as any;
      const product = new Product(productId);
      await product.pull();
      const productData = product.get();
      if (productData) {
        const order = await Order.createNewOrder({
          aditionalInfo: req.body,
          productId,
          userId: token.userId,
          status: "pending",
          createdAt: new Date(),
        });
        const pref = await createPreference({
          items: [
            {
              title: productData.title,
              description: productData.description,
              picture_url: "http://www.myapp.com/myimage.jpg",
              category_id: "car_electronics",
              quantity: 1,
              currency_id: "ARS",
              unit_price: productData.price,
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
    const order = new Order(req.query.orderId);
    await order.pull();
    const orderData = order.get();
    res.status(200).send({ orderData });
  },
});
