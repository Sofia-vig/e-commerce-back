import { productsIndex } from "lib/algolia";
import { base } from "lib/airtable";

/**
 * @param limit number
 * @param offset number
 * @param query string
 * @description Get Products from Algolia by Query with Limit and Offset
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
 * @description If product exist returns a product by id otherwise returns null
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
 * @description Returns all products from Algolia
 * @returns Promise<any>
 */
export async function getAllProducts(): Promise<any> {
  const records = await productsIndex.search("");
  return records.hits;
}

/**
 * @description Sync products from Airtable with Algolia every 30 minutes
 */
export const syncAirtableWithAlgolia = async () => {
  base("Funkos")
    .select({
      pageSize: 10,
    })
    .eachPage(
      async function page(records, fetchNextPage) {
        const objects = records.map((r) => {
          return {
            ...r.fields,
            objectID: r.id,
          };
        });
        await productsIndex.saveObjects(objects);
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          return null;
        }
        return { done: true };
      }
    );
};
