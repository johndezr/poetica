export const emailHasErrors = (email: string) => {
  const emailRules = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g

  return !emailRules.test(email)
}