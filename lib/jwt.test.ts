import test from "ava";
import { generate, decode } from "./jwt";

test("encode/decode", (t) => {
  const payload = { sofa: "vigna" };
  const token = generate(payload);
  const decoded = decode(token);
  delete decoded.iat;
  t.deepEqual(payload, decoded);
});
