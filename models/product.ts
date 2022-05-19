import { firestore } from "lib/firestore";
import { productsIndex } from "lib/algolia";
const collection = firestore.collection("products");

export class Product {
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
  get() {
    return this.data;
  }
  static async getByQuery(limit, offset, query) {
    return productsIndex.search(query, {
      page: offset > 1 ? Math.floor(offset / limit) : 0,
      hitsPerPage: limit,
    });
  }
}
