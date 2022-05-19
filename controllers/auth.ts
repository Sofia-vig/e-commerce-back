import { User } from "models/user";
import { Auth } from "models/auth";
import { generate } from "lib/jwt";
import gen from "random-seed";
import addMinutes from "date-fns/addMinutes";
var seed = "breakingBad";
var random = gen.create(seed);

/**
 * @param email string
 * @description
 * @returns Promise<Auth>
 */
export const findOrCreateAuth = async (email: string): Promise<Auth> => {
  const cleanEmail = email.trim().toLowerCase();
  const auth = await Auth.findByEmail(cleanEmail);
  if (auth) return auth;
  const newUser = await User.createNewUser({
    email: cleanEmail,
    createdAt: new Date(),
  });
  const newAuth = await Auth.createNewAuth({
    email: cleanEmail,
    userId: newUser.id,
    code: "",
    expires: new Date(),
  });
  return newAuth;
};

/**
 * @param email string
 * @description
 * @returns boolean
 */
export const sendCode = async (email: string) => {
  const auth = await findOrCreateAuth(email);
  const code = random.intBetween(10000, 99999);
  const now = new Date();
  const fiveMinutesFromNow = addMinutes(now, 5);
  auth.data.code = code;
  auth.data.expires = fiveMinutesFromNow;
  await auth.push();
  console.log("email enviado a " + email + " con codigo: " + code);
  return true;
};

/**
 * @param email string
 * @param code number
 * @description
 * @returns token:string
 */
export const getToken = async (email: string, code: number) => {
  const auth = await Auth.findByEmailAndCode(email, code);
  if (!auth) return "email or code incorrect";
  const expired = auth.isCodeExpired();
  if (expired) return "code expired";
  return { token: generate({ userId: auth.data.userId }) };
};
