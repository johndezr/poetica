import * as React from "react";
import LoginView from "@/views/login/";
import useLoginForm from "@/hooks/useLoginForm";

export default function SignIn() {
  const {
    handleEmailChange,
    handlePasswordChange,
    emailIsValid,
    handleSubmit,
    email,
    userAlreadyExist,
  } = useLoginForm();

  const formProps = {
    handleEmailChange,
    handlePasswordChange,
    emailIsValid,
    handleSubmit,
    email,
    userAlreadyExist,
  };

  return <LoginView formProps={formProps} />;
}
