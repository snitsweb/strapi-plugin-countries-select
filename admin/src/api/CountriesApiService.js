import { request } from '@strapi/helper-plugin';
import { id } from '../../../plugin-meta';

const findAll = async (apiFields = []) => {
  const validateIfExist = (field = '') => {
    if (!apiFields.includes(field)) apiFields.push(field);
  };

  validateIfExist('name');
  validateIfExist('flag');

  return request(`/${id}/countries?apiFields=${apiFields}`, {
    method: 'GET',
  });
};

export const CountriesApiService = {
  findAll,
};
