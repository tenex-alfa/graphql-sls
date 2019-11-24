import { DBHandler } from "./utils/db-handler";
import { User } from "./../models/sample-model/user-type";
export const getUserFromDB = (id: string): Promise<User> => {
  return DBHandler.get(id);
};
