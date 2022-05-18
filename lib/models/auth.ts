import { firestore } from "lib/firestore";
import isAfter from "date-fns/isAfter";
const collection = firestore.collection("auth");

export class Auth {
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
  static async findByEmail(email: string): Promise<Auth> {
    const results = await collection.where("email", "==", email).get();
    if (!results.docs.length) return null;
    const newAuth = new Auth(results.docs[0].id);
    newAuth.data = results.docs[0].data();
    return newAuth;
  }
  static async createNewAuth(data) {
    const newAuthSnap = await collection.add(data);
    const newAuth = new Auth(newAuthSnap.id);
    newAuth.data = data;
    return newAuth;
  }
  static cleanEmail(email: string) {
    return email.trim().toLowerCase();
  }
  isCodeExpired() {
    return isAfter(new Date(), this.data.expires.toDate());
  }
  static async findByEmailAndCode(email: string, code: number) {
    const cleanEmail = Auth.cleanEmail(email);
    const result = await collection
      .where("email", "==", cleanEmail)
      .where("code", "==", code)
      .get();
    if (result.empty) return null;
    const auth = new Auth(result.docs[0].id);
    auth.data = result.docs[0].data();
    return auth;
  }
}
