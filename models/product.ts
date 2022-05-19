import { productsIndex } from "lib/algolia";

export async function getProductsByQuery(limit, offset, query) {
  return productsIndex.search(query, {
    page: offset > 1 ? Math.floor(offset / limit) : 0,
    hitsPerPage: limit,
  });
}

export async function getProductById(id) {
  const records = await productsIndex.getObject(id);
  return records as any;
}

export async function getAllProducts() {
  const records = await productsIndex.search("");
  return records.hits;
}
