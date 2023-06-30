const pluginMeta = require('../plugin-meta')

module.exports = ({ strapi }) => {
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
