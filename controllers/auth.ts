import { User } from "models/user";
import { Auth } from "models/auth";
import gen from "random-seed";
import addMinutes from "date-fns/addMinutes";
var seed = "breakingBad";
var random = gen.create(seed);

export const findOrCreateAuth = async (email: string) => {
  const cleanEmail = email.trim().toLowerCase();
  const auth = await Auth.findByEmail(cleanEmail);
  if (auth) return auth;
  const newUser = await User.createNewUser({ email: cleanEmail });
  const newAuth = await Auth.createNewAuth({
    email: cleanEmail,
    userId: newUser.id,
    code: "",
    expires: new Date(),
  });
  return newAuth;
};

export const sendCode = async (email: string) => {
  const auth = await findOrCreateAuth(email);
  const code = random.intBetween(10000, 99999);
  const now = new Date();
  const twentyMinutesFromNow = addMinutes(now, 20);
  auth.data.code = code;
  auth.data.expires = twentyMinutesFromNow;
  await auth.push();
  console.log("email enviado a " + email + " con codigo: " + code);
  return true;
};
