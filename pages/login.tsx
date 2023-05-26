import * as React from "react";
import LoginView from "@/views/login/";
import useLoginForm from "@/hooks/useLoginForm";
import { withUserContext } from "../src/contexts/UserStorage";
import { useRouter } from "next/router";
import { useWeb3 } from "../src/contexts/Web3";

type SignInProps = {
  updateUser: () => void;
};

const SignIn = ({ updateUser }: SignInProps) => {
  const router = useRouter();
  const { redirect } = router.query;
  const {
    web3Api: { account },
  } = useWeb3();

  const {
    handleEmailChange,
    handlePasswordChange,
    emailIsValid,
    handleSubmit,
    email,
    userAlreadyExist,
  } = useLoginForm(updateUser, redirect, account as string);

  const formProps = {
    handleEmailChange,
    handlePasswordChange,
    emailIsValid,
    handleSubmit,
    email,
    userAlreadyExist,
  };

  return <LoginView formProps={formProps} />;
};

export default withUserContext(SignIn);
