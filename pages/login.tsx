import * as React from "react";
import LoginView from "@/views/login/";
import useLoginForm from "@/hooks/useLoginForm";

export default function SignIn() {
  const {
    handleEmailChange,
    handlePasswordChange,
    emailIsValid,
    handleSubmit,
  } = useLoginForm();

  const formProps = {
    handleEmailChange,
    handlePasswordChange,
    emailIsValid,
    handleSubmit,
  };

  return <LoginView formProps={formProps} />;
}
