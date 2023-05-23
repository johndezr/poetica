import { useState } from "react";
import { useRouter } from "next/router";
import { emailHasErrors } from "../../utils/formValidation";
import { getStorageValue, setStorageValue } from "./useLocalStorage";

type FormValues = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

const useSignupForm = () => {
  const [values, setValues] = useState<FormValues>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [userAlreadyExist, setUserAlreadyExist] = useState<boolean>(false);

  const usersCollection: FormValues[] = getStorageValue("users");

  const isUserAleadySignedUp = () => {
    setUserAlreadyExist(
      usersCollection.some(
        (user: { email: string }) => user.email === values.email
      )
    );
  };

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
    const formValues = {
      ...values,
      firstName: <string>data.get("firstName"),
      lastName: <string>data.get("lastName"),
      password: <string>data.get("password"),
    };
    setValues((values: FormValues) => ({
      ...values,
      ...formValues,
    }));
    if (emailIsValid) {
      isUserAleadySignedUp();
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
