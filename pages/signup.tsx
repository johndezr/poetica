import * as React from "react";
import SignupView from "@/views/signup/";
import useSignupForm from "@/hooks/useSignupForm";

export default function SignIn() {
  const {
    handleEmailChange,
    emailIsValid,
    handleSubmit,
    emailValue,
    userAlreadyExist,
  } = useSignupForm();

  const formProps = {
    handleEmailChange,
    emailIsValid,
    handleSubmit,
    emailValue,
    userAlreadyExist,
  };

  return <SignupView formProps={formProps} />;
}
