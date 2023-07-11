import type { IApiField } from '../../../types/api-field.type';
import type { ICountry } from '../../../types/country.interface';

import { id } from '../../../plugin-meta';

import { request } from '@strapi/helper-plugin';


const findAll = async (apiFields = [] as IApiField[]): Promise<ICountry[]> => {
  const validateIfExist = (field: IApiField) => {
    if (!apiFields.includes(field)) apiFields.push(field);
  };

  validateIfExist('name');
  validateIfExist('flag');

  return request(`/${ id }/countries?apiFields=${ apiFields }`, {
    method: 'GET',
  });
};

export const CountriesApiService = {
  findAll,
};
