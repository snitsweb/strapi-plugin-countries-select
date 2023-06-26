import { request } from '@strapi/helper-plugin';
import { id as pluginId } from '../../../plugin-meta';

const findAll = async () => request(`/${pluginId}/countries`, {
  method: 'GET',
});

export const CountriesApiService = {
  findAll,
};
