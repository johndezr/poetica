import { getStorageValue } from "../../utils/storage";
import { UserValues } from "../types/user";

const usersCollection: UserValues[] = getStorageValue("users");

export const isUserAleadySignedUp = (email: string) => {
  return usersCollection.some(
    (user: { email: string }) => user.email === email
  );
};

export const getUserFromStorage = (email: string) => {
  return usersCollection.find(
    (user: { email: string }) => user.email === email
  );
};
