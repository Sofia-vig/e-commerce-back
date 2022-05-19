// Recibe la señal de MercadoPago para confirmar que el pago fué realizado con éxito. Cambia el estado de la compra en nuestra base y le envía un email al usuario para avisarle que el pago se realizó correctamente. También se debe generar algún aviso hacia quienes deban procesar esta compra.
// Esto último es algo interno así que puede ser un email o un registro en Airtable.

import methods from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { getMerchantOrder } from "lib/mercadopago";
import { Order } from "lib/models/order";

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

        //con este orderId voy a firebase a la collection de order y ese order deberia tener
        //asociado un userId del que realizo la compra y genero la orden ( al cual le vamos a mandar un mail)
        // tmb cambiamos el estado de la orden interna que tenemos guardada como q ya esta pago
      }
    }
    res.send({});
  },
});
