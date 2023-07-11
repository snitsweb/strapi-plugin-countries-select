import type { Strapi } from '@strapi/strapi';
import type { ICountry } from '../../types/country.interface';

import pluginMeta from '../../plugin-meta';

import axios from 'axios';


class CountriesService {
  private strapi: Strapi;

  constructor ({ strapi }) {
    this.strapi = strapi;
  }

  async findMany ({ apiFields = 'name, flag' }) {
    const apiURL = `${ this.strapi.plugin(pluginMeta.id).config('countriesApiURL') }?fields=${ apiFields }`;
    const { data } = await axios.get<ICountry[]>(apiURL);

    if (!data) throw new Error('Something went wrong when fetching data from countries API');
    return data;
  }
}

export const CountriesServiceBuilder = (props: {strapi: Strapi}) => new CountriesService(props);
