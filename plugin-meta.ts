const pluginPkg = require('./package.json');


export const id = pluginPkg.strapi.name.replace(/^(@[^-,.][\w,-]+\/|strapi-)plugin-/i, '');
export const displayName = pluginPkg.strapi.displayName as string;
export const description = pluginPkg.strapi.description as string;

export default {
  id,
  displayName,
  description,
};
