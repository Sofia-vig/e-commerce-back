import { productsIndex } from "lib/algolia";

export async function getProductsByQuery(limit, offset, query) {
  const records = await productsIndex.search(query, {
    page: offset > 1 ? Math.floor(offset / limit) : 0,
    hitsPerPage: limit,
  });

  return {
    results: records.hits,
    pagination: {
      offset,
      limit,
      total: records.nbHits,
    },
  };
}

export async function getProductById(id) {
  try {
    const records = await productsIndex.getObject(id);
    return records as any;
  } catch (err) {
    return null;
  }
}

export async function getAllProducts() {
  const records = await productsIndex.search("");
  return records.hits;
}
