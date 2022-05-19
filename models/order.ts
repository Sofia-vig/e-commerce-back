import { firestore } from "lib/firestore";
const collection = firestore.collection("orders");

export class Order {
  id: string;
  ref: FirebaseFirestore.DocumentReference;
  data: any;
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
  static async createNewOrder(newOrderData = {}) {
    const newOrderSnap = await collection.add(newOrderData);
    const newOrder = new Order(newOrderSnap.id);
    newOrder.data = newOrderData;
    return newOrder;
  }
  static async close(order, id) {
    await collection.doc(id).update({
      status: "closed",
      externalOrder: order,
      editedAt: new Date(),
    });
  }
  static async getOrdersByUserId(userId: string) {
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
