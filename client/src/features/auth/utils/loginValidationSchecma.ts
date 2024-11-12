import * as Yup from "yup";
export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .required("This field is required")
    .min(3, "Must be more than 3 characters"),
  password: Yup.string()
    .required("This field is required")
    .min(3, "Must be more than 3 characters"),
});

export const verifyValidationSchema = Yup.object({
  verifyCode: Yup.string()
    .required("This field is required")
    .length(4, "The verification code must be exactly 4 digits"),
});
