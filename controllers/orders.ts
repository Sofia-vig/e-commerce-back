import { Order } from "models/order";
import { getMerchantOrder, createPreference } from "lib/mercadopago";
import { getProductById } from "models/product";
import { sendEmailToUserOnce, sendInternEmailOnce } from "lib/email";
import { User } from "models/user";

/**
 * @param userId string
 * @description Get orders by user id with formatted data
 * @returns Promise<any[]>
 */
export const getOrderByUserId = async (userId: string): Promise<any[]> => {
  const snap = await Order.getByUserId(userId);
  return snap.docs.map((d) => {
    return { status: d.data().status, aditionalInfo: d.data().aditionalInfo };
  });
};

/**
 * @param topic
 * @param id
 * @description Close an order if order_status is "paid" and send an email
 * @returns Promise<any>
 */
export const closeOrder = async (
  topic,
  id
): Promise<{ closed: boolean } | string> => {
  if (topic != "merchant_order") return "order not closed";
  const order = await getMerchantOrder(id);
  if (order.order_status == "paid") {
    const orderId = order.external_reference;
    await Order.close(order, orderId);
    const { product, email } = await getDataForEmail(orderId);
    await sendEmailToUserOnce(email, product);
    await sendInternEmailOnce(product);
    return { closed: true };
  }
};

/**
 * @param productId string
 * @param orderInfo
 * @param userId string
 * @description Create an order with data and a Preference for Mercado Pago. Return url for payment
 * @returns Promise<any>
 */
export const createOrderAndPreferences = async (
  productId: string,
  orderInfo,
  userId: string
): Promise<{ url: string; orderId: string }> => {
  const product = await getProductById(productId);
  if (!product) throw "El producto no existe";
  const quantity = orderInfo.quantity || 1;
  const order = await Order.createNewOrder({
    aditionalInfo: { ...orderInfo, quantity },
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
        quantity,
        currency_id: "ARS",
        unit_price: product.price,
      },
    ],
    back_urls: {
      success: "https://e-commerce-nine-red.vercel.app/thanks/" + productId,
    },
    external_reference: order.id,
    notification_url:
      "https://e-commerce-back-omega.vercel.app/api/ipn/mercadopago",
  });
  return { url: pref.init_point, orderId: order.id };
};

export const getDataForEmail = async (
  orderId
): Promise<{ email: string; product: any }> => {
  const orderInstance = new Order(orderId);
  await orderInstance.pull();
  const user = new User(orderInstance.data.userId);
  await user.pull();
  const product = await getProductById(orderInstance.data.productId);
  return { email: user.data.email, product };
};
