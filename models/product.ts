import { productsIndex } from "lib/algolia";

export async function getByQuery(limit, offset, query) {
  return productsIndex.search(query, {
    page: offset > 1 ? Math.floor(offset / limit) : 0,
    hitsPerPage: limit,
  });
}

export async function getById(id) {
  const records = await productsIndex.getObject(id);
  return records as any;
}
