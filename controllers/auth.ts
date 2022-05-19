import { User } from "models/user";
import { Auth } from "models/auth";
import { generate } from "lib/jwt";
import { generateCodeWithExpires } from "lib/utils";

/**
 * @param email string
 * @description If Auth exist return auth if not create a new user and  new auth
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
 * @description Generate a code with property expires en send a email with the code
 * @returns true
 */
export const sendCode = async (email: string) => {
  const auth = await findOrCreateAuth(email);
  const { code, expires } = generateCodeWithExpires();
  auth.data.code = code;
  auth.data.expires = expires;
  await auth.push();
  console.log("email enviado a " + email + " con codigo: " + code);
  return true;
};

/**
 * @param email string
 * @param code number
 * @description If code is not expired, and the email and code are the same return a token
 * @returns token:string
 */
export const getToken = async (email: string, code: number) => {
  const auth = await Auth.findByEmailAndCode(email, code);
  if (!auth) return "email or code incorrect";
  const expired = auth.isCodeExpired();
  if (expired) return "code expired";
  return { token: generate({ userId: auth.data.userId }) };
};
