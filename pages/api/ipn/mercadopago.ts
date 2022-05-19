import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { getMerchantOrder } from "lib/mercadopago";
import { Order } from "models/order";

export default methods({
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, topic } = req.query;
    if (topic == "merchant_order") {
      const order = await getMerchantOrder(id);
      if (order.order_status == "paid") {
        const orderId = order.external_reference;
        const newOrder = new Order(orderId);
        await newOrder.pull();
        newOrder.data.status = "closed";
        newOrder.data.externalOrder = order;
        //editedAt
        await newOrder.push();
        // sendEmail("Tu pago fue confirmado");
        // sendEmailInterno("Alguien compro algo");
      }
    }
    res.send({});
  },
});
