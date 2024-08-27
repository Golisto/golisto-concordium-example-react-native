module.exports = {
  global: {
    form: {
      static: {
        optional: 'Valgfri',
      },
      error: {
        required: 'Påkrævet',
      },
    },
  },
  components: {
    paginationIndicator: {
      state: {
        idle: 'Indlæs mere',
        loading: 'Indlæser',
        end: 'Bunden er nået!',
      },
    },
  },
}
