import type { Strapi } from '@strapi/strapi';

import pluginMeta from '../../plugin-meta';


class CountriesController {
  private strapi: Strapi;

  constructor ({ strapi }: {strapi: Strapi}) {
    this.strapi = strapi;
  }

  async findMany (ctx) {
    ctx.body = await this.strapi
      .plugin(pluginMeta.id)
      .service('CountriesService')
      .findMany(ctx.query)
      .catch((err) => ctx.throw(500, err));
  }
}

export const CountriesControllerBuilder = (props: {strapi: Strapi}) => new CountriesController(props);
