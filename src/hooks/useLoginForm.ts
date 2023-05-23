import { useState } from "react";
import { useRouter } from "next/router";
import { emailHasErrors } from "../../utils/formValidation";
import { getStorageValue, setStorageValue } from "./useLocalStorage";
import { isUserAleadySignedUp } from "./useAuth";

const useLoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [userAlreadyExist, setUserAlreadyExist] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const emailCheck = emailHasErrors(value);
    setEmailIsValid(!emailCheck);
    setEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (emailIsValid) {
      if (isUserAleadySignedUp(email)) {
        setUserAlreadyExist(false);
        const formValues = {
          email: <string>data.get("email"),
          password: <string>data.get("password"),
        };
        setEmail(formValues.email);
        setPassword(formValues.password);
        console.log("formValues", formValues);
      } else {
        setUserAlreadyExist(true);
      }
    }
  };

  return {
    email,
    emailIsValid,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    userAlreadyExist,
  };
};

export default useLoginForm;
