import { useState } from "react";
import { useRouter } from "next/router";
import { emailHasErrors } from "../../utils/formValidation";
import { getStorageValue, setStorageValue } from "./useLocalStorage";
import { UserValues } from "../types/user";
import { isUserAleadySignedUp } from "./useAuth";

const useSignupForm = (updateUser: Function) => {
  const router = useRouter();
  const [values, setValues] = useState<UserValues>({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [userAlreadyExist, setUserAlreadyExist] = useState<boolean>(false);

  const usersCollection: UserValues[] = getStorageValue("users");

  const saveUser = (formValues: UserValues) => {
    const users = usersCollection || [];
    users.push(formValues);
    setStorageValue("users", users);
    setStorageValue("userId", formValues.id);
    updateUser(formValues);
    router.push("/");
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
      id: "_" + Math.random().toString(36).substr(2, 9),
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
      if (!userAlreadyExist) saveUser(formValues);
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
