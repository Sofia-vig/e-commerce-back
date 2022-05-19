import { Order } from "models/order";
import { getMerchantOrder } from "lib/mercadopago";

export async function closeOrder(topic, id) {
  if (topic != "merchant_order") return null;
  const order = await getMerchantOrder(id);
  if (order.order_status == "paid") {
    const orderId = order.external_reference;
    await Order.close(order, orderId);
    // sendEmail("Tu pago fue confirmado");
    // sendEmailInterno("Alguien compro algo");
  }
}
