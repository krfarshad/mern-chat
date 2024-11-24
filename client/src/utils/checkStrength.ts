export const isPasswordStrong = (password: string): boolean => {
  const minLength = 7;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isStrong = hasUpperCase && hasLowerCase && hasNumber;
  // password.length >= minLength &&

  // hasSpecialChar;
  return isStrong ? true : false;
};
