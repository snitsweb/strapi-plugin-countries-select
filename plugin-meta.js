const pluginPkg = require('./package.json');

const pluginId = pluginPkg.strapi.name.replace(/^(@[^-,.][\w,-]+\/|strapi-)plugin-/i, '');

module.exports = {
  id: pluginId,
  displayName: pluginPkg.strapi.displayName,
  description: pluginPkg.strapi.description,
};
