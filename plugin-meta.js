const pluginPkg = require('./package.json');

const pluginId = pluginPkg.name.replace(/^(@[^-,.][\w,-]+\/|strapi-)plugin-/i, '');

module.exports = {
  id: pluginId,
  name: pluginPkg.strapi.name,
  displayName: pluginPkg.strapi.displayName,
  description: pluginPkg.strapi.description,
};
