export const routes = [
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
