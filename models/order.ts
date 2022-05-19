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
  /**
   * @param newOrderData
   * @description
   * @returns Promise<Order>
   */
  static async createNewOrder(newOrderData = {}): Promise<Order> {
    const newOrderSnap = await collection.add(newOrderData);
    const newOrder = new Order(newOrderSnap.id);
    newOrder.data = newOrderData;
    return newOrder;
  }
  /**
   * @param order
   * @param id
   * @description
   * @returns Promise<any>
   */
  static async close(order, id): Promise<any> {
    return collection.doc(id).update({
      status: "closed",
      externalOrder: order,
      editedAt: new Date(),
    });
  }
  /**
   * @param userId
   * @returns Promise<any>
   */
  static async getByUserId(userId: string): Promise<any> {
    return collection.where("userId", "==", userId).get();
  }
  get() {
    return this.data;
  }
}
