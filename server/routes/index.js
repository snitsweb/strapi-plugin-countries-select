module.exports = [
  {
    method: 'GET',
    path: '/countries',
    handler: 'CountriesController.findMany',
    config: {
      policies: [],
      auth: false,
    },
  },
];
