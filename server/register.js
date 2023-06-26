const pluginMeta = require('../plugin-meta')

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'select',
    plugin: pluginMeta.name,
    type: 'json',
    inputSize: {
      default: 6,
      isResizable: true,
    },
  });
};
