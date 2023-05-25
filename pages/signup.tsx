import * as React from "react";
import SignupView from "@/views/signup/";
import useSignupForm from "@/hooks/useSignupForm";
import { withUserContext } from "../src/contexts/UserStorage";
import { useWeb3 } from "@/contexts/Web3";

type SignUpProps = {
  updateUser: () => void;
};

const SignUp = ({ updateUser }: SignUpProps) => {
  const {
    web3Api: { account },
  } = useWeb3();

  const {
    handleEmailChange,
    emailIsValid,
    handleSubmit,
    emailValue,
    userAlreadyExist,
  } = useSignupForm(updateUser, account);

  const formProps = {
    handleEmailChange,
    emailIsValid,
    handleSubmit,
    emailValue,
    userAlreadyExist,
  };

  return <SignupView formProps={formProps} />;
};

export default withUserContext(SignUp);
