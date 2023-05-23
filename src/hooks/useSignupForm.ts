import { useState } from "react";
import { useRouter } from "next/router";
import { emailHasErrors } from "../../utils/formValidation";
import { getStorageValue, setStorageValue } from "./useLocalStorage";
import { UserValues } from "../types/user";
import { isUserAleadySignedUp } from "./useAuth";

const useSignupForm = () => {
  const [values, setValues] = useState<UserValues>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [userAlreadyExist, setUserAlreadyExist] = useState<boolean>(false);

  const usersCollection: UserValues[] = getStorageValue("users");

  const saveUser = () => {
    const users = usersCollection || [];
    users.push(values);
    setStorageValue("users", users);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const emailCheck = emailHasErrors(value);
    setEmailIsValid(!emailCheck);
    setValues((values) => ({ ...values, email: e.target.value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userAlreadyExist = isUserAleadySignedUp(values.email);
    const formValues = {
      ...values,
      firstName: <string>data.get("firstName"),
      lastName: <string>data.get("lastName"),
      password: <string>data.get("password"),
    };
    setValues((values: UserValues) => ({
      ...values,
      ...formValues,
    }));
    setUserAlreadyExist(userAlreadyExist);
    if (emailIsValid) {
      if (!userAlreadyExist) saveUser();
    }
  };

  return {
    emailValue: values.email,
    emailIsValid,
    handleEmailChange,
    handleSubmit,
    userAlreadyExist,
  };
};

export default useSignupForm;
