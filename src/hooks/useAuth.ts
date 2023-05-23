import { getStorageValue } from "./useLocalStorage";
import { UserValues } from "../types/user";

const usersCollection: UserValues[] = getStorageValue("users");

export const isUserAleadySignedUp = (email: string) => {
  return usersCollection.some(
    (user: { email: string }) => user.email === email
  );
};
