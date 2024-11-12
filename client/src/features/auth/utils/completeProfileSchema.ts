import * as Yup from "yup";
export const completeProfileSchema = Yup.object({
  bio: Yup.string()
    .required("This field is required")
    .min(3, "Must be more than 3 characters")
    .max(30, "Must be less than 30 characters"),

  displayName: Yup.string()
    .required("This field is required")
    .min(3, "Must be more than 3 characters")
    .max(30, "Must be less than 30 characters"),
});
