import * as Yup from "yup";
export const registerValidationSchecma = Yup.object({
  username: Yup.string()
    .required("This field is required")
    .min(3, "Must be more than 3 characters"),
  password: Yup.string()
    .required("This field is required")
    .min(3, "Must be more than 3 characters"),
  email: Yup.string()
    .required("This field is required")
    .email("Must be a valid email address"),
});
