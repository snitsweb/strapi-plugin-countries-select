import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginMeta from '../../plugin-meta';
import Icon from './components/Icon';

export default {
  register(app) {
    app.customFields.register([
      {
        name: 'select',
        pluginId: pluginMeta.name,
        type: 'json',
        icon: Icon,
        intlLabel: {
          id: `${pluginMeta.name}.plugin.name`,
          defaultMessage: pluginMeta.name,
        },
        intlDescription: {
          id: `${pluginMeta.name}.plugin.description`,
          defaultMessage: pluginMeta.description,
        },
        components: {
          Input: async () => import('./components/Input'),
        },
        options: {
          base: [
            {
              sectionTitle: {
                id: `${pluginMeta.name}.baseOptions`,
                default: 'Base options',
              },
              items: [
                {
                  name: 'required',
                  type: 'checkbox',
                  intlLabel: {
                    id: 'form.attribute.item.requiredField',
                    defaultMessage: 'Required field',
                  },
                  description: {
                    id: 'form.attribute.item.requiredField.description',
                    defaultMessage: 'You won\'t be able to create an entry if this field is empty',
                  },
                },
              ],
            },
          ],
          advanced: [
            {
              sectionTitle: {
                id: `${pluginMeta.name}.advancedOptions.title`,
                default: 'Advanced options',
              },
              items: [
                {
                  name: 'options.apiFields',
                  type: 'textarea',
                  defaultValue: '["name", "flag"]',
                  intlLabel: {
                    id: `${pluginMeta.name}.advancedOptions.apiFields`,
                    defaultMessage: 'Array of api fields to get from API',
                  },
                  description: {
                    id: `${pluginMeta.name}.advancedOptions.apiFieldsDescription`,
                    defaultMessage: 'Default value: [\'name\', \'flag\']',
                  },
                },
              ],
            },
          ],
        },
      },
    ]);
  },

  bootstrap(app) { console.info(app); },

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => import(
        /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
      )
        .then(({ default: data }) => ({
          data: prefixPluginTranslations(data, pluginMeta.name),
          locale,
        }))
        .catch(() => ({
          data: {},
          locale,
        }))),
    );

    return Promise.resolve(importedTrads);
  },
};
