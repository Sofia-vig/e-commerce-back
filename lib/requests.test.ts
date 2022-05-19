import test from "ava";
import { getOffsetAndLimit } from "./requests";

test("offset/limit", (t) => {
  const { limit, offset } = getOffsetAndLimit({
    query: { limit: "100000", offset: "2" },
  } as any);
  t.deepEqual({ limit, offset }, { limit: 100, offset: 2 });
});
