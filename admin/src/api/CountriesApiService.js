import { request } from '@strapi/helper-plugin';
import { name } from '../../../plugin-meta';

const findAll = async () => request(`/${name}/countries`, {
  method: 'GET',
});

export const CountriesApiService = {
  findAll,
};
