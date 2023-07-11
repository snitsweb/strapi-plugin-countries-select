import type { Strapi } from '@strapi/strapi';

import pluginMeta from '../plugin-meta';


export const register = ({ strapi }: {strapi: Strapi}) => {
  strapi.customFields.register({
    name: 'select',
    plugin: pluginMeta.id,
    type: 'json',
    inputSize: {
      default: 6,
      isResizable: true,
    },
  });
  strapi.customFields.register({
    name: 'multiselect',
    plugin: pluginMeta.id,
    type: 'json',
    inputSize: {
      default: 6,
      isResizable: true,
    },
  });
};
