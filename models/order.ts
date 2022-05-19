import { firestore } from "lib/firestore";
const collection = firestore.collection("orders");

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
}
