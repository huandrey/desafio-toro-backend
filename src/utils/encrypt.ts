import * as bcrypt from "bcrypt";

export const cryptPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 8);

  return hash;
};

export const checkPassword = async (password: string, hash: string) => {
  const match = await bcrypt.compare(password, hash);

  return match;
};
