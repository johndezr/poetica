import * as React from "react";
import LoginView from "@/views/login/";
import useLoginForm from "@/hooks/useLoginForm";
import { withUserContext } from "../src/contexts/UserStorage";

const SignIn = ({ updateUser }) => {
  const {
    handleEmailChange,
    handlePasswordChange,
    emailIsValid,
    handleSubmit,
    email,
    userAlreadyExist,
  } = useLoginForm(updateUser);

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
