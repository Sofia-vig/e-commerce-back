import { Order } from "models/order";
import { getMerchantOrder, createPreference } from "lib/mercadopago";
import { getProductById } from "models/product";
import { sendEmailToUser } from "lib/email";
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
 * @description Close an order if order_status is "paid"
 * @returns Promise<any>
 */
export const closeOrder = async (topic, id): Promise<any> => {
  if (topic != "merchant_order") return "order not closed";
  const order = await getMerchantOrder(id);
  if (order.order_status == "paid") {
    const orderId = order.external_reference;
    await Order.close(order, orderId);
    const orderInstance = new Order(id);
    await orderInstance.pull();
    console.log({ orderInstance });
    console.log(orderInstance.data);

    const user = new User(orderInstance.data.userId);
    await user.pull();
    const product = await getProductById(orderInstance.data.productId);
    await sendEmailToUser(user.data.email, product);
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
): Promise<any> => {
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
