import { useState } from 'react'
import { useRouter } from 'next/router'
import { emailHasErrors } from '../../utils/formValidation';

const useLoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const emailCheck = emailHasErrors(value)
    setEmailIsValid(!emailCheck)
    setEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (emailIsValid && password !== "") {
      console.log({
        email: data.get("email"),
        password: data.get("password"),
      });
    }
  };

  return {
    emailIsValid,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
}

export default useLoginForm