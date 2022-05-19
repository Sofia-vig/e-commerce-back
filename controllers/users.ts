import { User } from "models/user";

export const updateUserAddress = async (userId, address) => {
  const user = new User(userId);
  await user.pull();
  user.updateAddress(address);
  return user.push();
};
