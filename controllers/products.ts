import { base } from "lib/airtable";
import { productsIndex } from "lib/algolia";

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
