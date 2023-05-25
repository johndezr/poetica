export type UserValues = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  wallet?: {
    address: string;
  };
};
