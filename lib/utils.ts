import addMinutes from "date-fns/addMinutes";

export const generateCodeWithExpires = (): { code: number; expires: Date } => {
  const code = Math.floor(Math.random() * 90000) + 10000;
  const now = new Date();
  const fiveMinutesFromNow = addMinutes(now, 5);
  return { code, expires: fiveMinutesFromNow };
};
