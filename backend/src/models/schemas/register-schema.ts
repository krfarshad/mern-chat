export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "Username must be at least 5 characters with a max of 32 characters",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be a string!",
    },
  },
  // displayName: {
  //   notEmpty: true,
  //   errorMessage: "Invalid display name",
  // },
  password: {
    notEmpty: true,
    errorMessage: "Invalid password",
  },
  email: {
    notEmpty: {
      errorMessage: "Email address cannot be empty",
    },
    isEmail: {
      errorMessage: "Invalid email address",
    },
  },
};
