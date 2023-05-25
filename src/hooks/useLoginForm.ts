import { useState } from "react";
import { useRouter } from "next/router";
import { emailHasErrors } from "../../utils/formValidation";
import { setStorageValue } from "../../utils/storage";
import { isUserAleadySignedUp, getUserFromStorage } from "./useAuth";

const useLoginForm = (
  updateUser: Function,
  redirect: string | unknown,
  account: string
) => {
  const router = useRouter();
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
    if (emailIsValid) {
      if (isUserAleadySignedUp(email)) {
        setUserAlreadyExist(false);
        const user = getUserFromStorage(email);
        setStorageValue("userId", user?.id);

        if (!user?.wallet && account) {
          user!.wallet = {
            address: account,
          };
        }

        updateUser(user);
        router.push(redirect ? redirect : `/profile/${user?.id}`);
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
