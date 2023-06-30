import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginMeta from '../../plugin-meta';
import Icon from './components/Icon';
import getTrad from './utils/getTrad';

export default {
  register(app) {
    app.customFields.register([
      {
        name: 'select',
        pluginId: pluginMeta.id,
        type: 'json',
        icon: Icon,
        intlLabel: {
          id: getTrad('plugin.name'),
          defaultMessage: pluginMeta.id,
        },
        intlDescription: {
          id: getTrad('plugin.description'),
          defaultMessage: pluginMeta.description,
        },
        components: {
          Input: async () => import('./components/SingleInput/SingleInput'),
        },
        options: {
          base: [
            {
              sectionTitle: {
                id: getTrad('baseOptions.title'),
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
                id: getTrad('advancedOptions.title'),
                default: 'Advanced options',
              },
              items: [
                {
                  name: 'options.apiFields',
                  type: 'textarea',
                  defaultValue: '["name", "flag"]',
                  intlLabel: {
                    id: getTrad('advancedOptions.apiFields'),
                    defaultMessage: 'Array of api fields to get from API',
                  },
                  description: {
                    id: getTrad('advancedOptions.apiFieldsDescription'),
                    defaultMessage: 'Default value: ["name", "flag"]. More fields you can find here there: https://restcountries.com',
                  },
                },
              ],
            },
          ],
        },
      },
    ]);
    app.customFields.register([
      {
        name: 'multiselect',
        pluginId: pluginMeta.id,
        type: 'json',
        icon: Icon,
        intlLabel: {
          id: getTrad('plugin.multiple-name'),
          defaultMessage: `multi-${pluginMeta.id}`,
        },
        intlDescription: {
          id: getTrad('plugin.multiple-description'),
          defaultMessage: pluginMeta.description,
        },
        components: {
          Input: async () => import('./components/MultipleInput/MultipleInput'),
        },
        options: {
          base: [
            {
              sectionTitle: {
                id: getTrad('baseOptions.title'),
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
                id: getTrad('advancedOptions.title'),
                default: 'Advanced options',
              },
              items: [
                {
                  name: 'options.apiFields',
                  type: 'textarea',
                  defaultValue: '["name", "flag"]',
                  intlLabel: {
                    id: getTrad('advancedOptions.apiFields'),
                    defaultMessage: 'Array of api fields to get from API',
                  },
                  description: {
                    id: getTrad('advancedOptions.apiFieldsDescription'),
                    defaultMessage: 'Default value: ["name", "flag"]. Find more fields: https://restcountries.com',
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
          data: prefixPluginTranslations(data, pluginMeta.id),
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
