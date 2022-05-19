import { firestore } from "lib/firestore";
const collection = firestore.collection("orders");
import { getMerchantOrder } from "lib/mercadopago";

// type OrderData = {
//   aditionalInfo: { color: string; direccion_envio: string };
//   productId: string;
//   userId: string;
//   status: "pending" | "payed"
// };

export class Order {
  id: string;
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  // data:OrderData;
  constructor(id) {
    this.id = id;
    this.ref = collection.doc(id);
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }
  async push() {
    this.ref.update(this.data);
  }
  static async createNewOrder(
    newOrderData = {}
    //  OrderData = {
    //   aditionalInfo: { color: "", direccion_envio: "" },
    //   productId: "",
    //   userId: "",
    // }
  ) {
    const newOrderSnap = await collection.add(newOrderData);
    const newOrder = new Order(newOrderSnap.id);
    newOrder.data = newOrderData;
    return newOrder;
  }
  static async close(orderId) {
    const order = await getMerchantOrder(orderId);
    if (order.order_status == "paid") {
      const orderId = order.external_reference;
      const newOrder = new Order(orderId);
      await newOrder.pull();
      newOrder.data.status = "closed";
      newOrder.data.externalOrder = order;
      newOrder.data.editedAt = new Date();
      await newOrder.push();
      // sendEmail("Tu pago fue confirmado");
      // sendEmailInterno("Alguien compro algo");
      return true;
    }
  }
  static async getMyOrders(userId: string) {
    const snap = await collection.where("userId", "==", userId).get();
    return snap.docs.map((d) => {
      const { status, aditionalInfo } = d.data();
      return { status, aditionalInfo };
    });
  }
  get() {
    return this.data;
  }
}
