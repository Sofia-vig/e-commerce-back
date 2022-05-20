import { firestore } from "lib/firestore";
const collection = firestore.collection("users");

class UserData {
  fullname?: string;
  address?: string;
  email?: string;
  createdAt?: Date;
}

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
   * @description Create new user and return the user data
   * @returns Promise<User>
   */
  static async createNewUser(data: UserData): Promise<User> {
    const newUserSnap = await collection.add(data);
    const newUser = new User(newUserSnap.id);
    newUser.data = data;
    return newUser;
  }
  /**
   * @param data
   * @description Update user data
   * @returns Promise<any>
   */
  async update(data): Promise<any> {
    return collection.doc(this.id).update(data);
  }
}
