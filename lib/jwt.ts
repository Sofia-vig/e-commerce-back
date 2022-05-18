import jwt from "jsonwebtoken";

export const generate = (obj) => {
  return jwt.sign(obj, process.env.JWT_SECRET);
};

export const decode = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
};
