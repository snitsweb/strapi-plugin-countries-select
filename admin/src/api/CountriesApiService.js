import { request } from '@strapi/helper-plugin';
import { name } from '../../../plugin-meta';

const findAll = async (apiFields = []) => {
  const validateIfExist = (field = '') => {
    if (!apiFields.includes(field)) apiFields.push(field);
  };

  validateIfExist('name');
  validateIfExist('flag');

  return request(`/${name}/countries?apiFields=${apiFields}`, {
    method: 'GET',
  });
};

export const CountriesApiService = {
  findAll,
};
