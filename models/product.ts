import { productsIndex } from "lib/algolia";

/**
 * @param limit number
 * @param offset number
 * @param query string
 * @description
 * @returns Promise<Object>
 */
export async function getProductsByQuery(
  limit: number,
  offset: number,
  query: string
): Promise<Object> {
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

/**
 * @param id string
 * @description
 * @returns Promise<any>
 */
export async function getProductById(id: string): Promise<any> {
  try {
    const records = await productsIndex.getObject(id);
    return records as any;
  } catch (err) {
    return null;
  }
}

/**
 * @description
 * @returns Promise<any>
 */
export async function getAllProducts(): Promise<any> {
  const records = await productsIndex.search("");
  return records.hits;
}
