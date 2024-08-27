export default {
  global: {
    error: {
      title: "Fejl opstod",
      text: "Noget gik galt. Vend venligst tilbage :-)",
      button: "Tilbage til start",
      accessability: {
        reset: "Gå tilbage til hjemmeskærmen",
      },
    },
    unknownError: {
      title: "Hovsa!",
      text: "Noget gik galt. Prøv igen senere.",
    },
    apiError: {
      USER__REGISTER_LOCAL__ALREADY_EXISTS:
        "En bruger med den e-mail eksisterer allerede",
      USER__LOCAL_LOGIN__INVALID_CREDENTIALS:
        "Vi kunne ikke finde en bruger der passede med de indtasede loginoplysninger",
    },
  },
};
