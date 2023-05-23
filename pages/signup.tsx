import * as React from "react";
import SignupView from "@/views/signup/";
import useSignupForm from "@/hooks/useSignupForm";
import { withUserContext } from "../src/contexts/UserStorage";

const SignUp = ({ updateUser }) => {
  const {
    handleEmailChange,
    emailIsValid,
    handleSubmit,
    emailValue,
    userAlreadyExist,
  } = useSignupForm(updateUser);

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
