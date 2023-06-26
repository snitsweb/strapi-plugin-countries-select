const pluginMeta = require('../../plugin-meta');

class CountriesController {
  strapi;

  constructor({ strapi }) {
    this.strapi = strapi;
  }

  async findMany(ctx) {
    ctx.body = await this.strapi
      .plugin(pluginMeta.name)
      .service('CountriesService')
      .findMany()
      .catch((err) => ctx.throw(500, err));
  }
}

module.exports = (...args) => new CountriesController(...args);