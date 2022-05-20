import gen from "random-seed";
import addMinutes from "date-fns/addMinutes";
var seed = "breakingBad";
var random = gen.create(seed);

export const generateCodeWithExpires = (): { code: number; expires: Date } => {
  const code = random.intBetween(10000, 99999);
  const now = new Date();
  const fiveMinutesFromNow = addMinutes(now, 5);
  return { code, expires: fiveMinutesFromNow };
};
