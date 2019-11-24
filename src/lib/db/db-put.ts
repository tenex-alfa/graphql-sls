import { User } from "./../models/sample-model/user-type";
import { DBHandler } from "./utils/db-handler";
export const putUserToDB = async (id: string, user: User) => {
  await DBHandler.put(id, user);
  return user;
};
