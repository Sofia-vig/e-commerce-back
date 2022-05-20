import { User } from "models/user";

export const getUser = async (id: string): Promise<User> => {
  const user = new User(id);
  await user.pull();
  if (!user.data) throw "User not found";
  return user.data;
};

export const updateUser = async (id: string, userData): Promise<any> => {
  const user = new User(id);
  return user.update(userData);
};
