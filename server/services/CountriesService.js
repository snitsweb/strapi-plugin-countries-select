const axios = require('axios');
const pluginMeta = require('../../plugin-meta');

class CountriesService {
  strapi;

  constructor({ strapi }) {
    this.strapi = strapi;
  }

  async findMany({ apiFields = 'name, flag' }) {
    const apiURL = `${this.strapi.plugin(pluginMeta.name).config('countriesApiURL')}?fields=${apiFields}`;
    const { data } = await axios.get(apiURL);
    if (!data) throw new Error('Something went wrong when fetching data from countries API');
    return data;
  }
}

module.exports = (...args) => new CountriesService(...args);
