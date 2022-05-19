import { User } from "models/user";

/**
 *
 * @param userId string
 * @param address string
 * @description
 * @returns Promise<any>
 */
export const updateUserAddress = async (
  userId: string,
  address: string
): Promise<any> => {
  const user = new User(userId);
  await user.pull();
  user.updateAddress(address);
  return user.push();
};
