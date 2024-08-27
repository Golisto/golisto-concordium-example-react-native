export default {
  global: {
    error: {
      title: "Error ocurred",
      text: "Something went wrong. Please go back :-)",
      button: "Back to home",
      accessability: {
        reset: "Navigates back to home screen",
      },
    },
    unknownError: {
      title: "Oh snap",
      text: "Something went wrong. Try again later.",
    },
    apiError: {
      USER__REGISTER_LOCAL__ALREADY_EXISTS:
        "A user with that email already exists",
      USER__LOCAL_LOGIN__INVALID_CREDENTIALS:
        "Email not found, or password is invalid",
    },
  }
};
