import { firestore } from "lib/firestore";
const collection = firestore.collection("users");

export class User {
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
   * @param data
   * @description
   * @returns Promise<User>
   */
  static async createNewUser(data): Promise<User> {
    const newUserSnap = await collection.add(data);
    const newUser = new User(newUserSnap.id);
    newUser.data = data;
    return newUser;
  }
  /**
   * @param data
   * @returns Promise<any>
   */
  async update(data): Promise<any> {
    return collection.doc(this.id).update(data);
  }
  /**
   * @param address string
   * @description
   */
  updateAddress(address: string) {
    this.data.address = address;
  }
}
