import { Order } from "models/order";
import { getMerchantOrder, createPreference } from "lib/mercadopago";
import { getProductById } from "models/product";

export const getOrderByUserId = async (userId) => {
  const snap = await Order.getByUserId(userId);
  return snap.docs.map((d) => {
    return { status: d.data().status, aditionalInfo: d.data().aditionalInfo };
  });
};

export const closeOrder = async (topic, id) => {
  if (topic != "merchant_order") return "order not closed";
  const order = await getMerchantOrder(id);
  if (order.order_status == "paid") {
    const orderId = order.external_reference;
    await Order.close(order, orderId);
    // sendEmail("Tu pago fue confirmado");
    // sendEmailInterno("Alguien compro algo");
    return { closed: true };
  }
};

export const createOrderAndPreferences = async (
  productId,
  orderInfo,
  userId
) => {
  const product = await getProductById(productId);
  if (!product) return "El producto no existe";
  const order = await Order.createNewOrder({
    aditionalInfo: orderInfo,
    productId,
    userId: userId,
    status: "pending",
    createdAt: new Date(),
  });
  const pref = await createPreference({
    items: [
      {
        title: product.name,
        description: product.description,
        picture_url: product.image.url,
        category_id: product.category,
        quantity: 1,
        currency_id: "ARS",
        unit_price: product.price,
      },
    ],
    back_urls: {
      success: "https://apx.school",
    },
    external_reference: order.id,
    notification_url:
      "https://e-commerce-back-omega.vercel.app/api/ipn/mercadopago",
  });
  return { url: pref.init_point };
};
