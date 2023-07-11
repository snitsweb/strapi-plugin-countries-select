import Icon from './components/Icon';
import getTrad from './utils/getTrad';

import pluginMeta from '../../plugin-meta';

import { prefixPluginTranslations } from '@strapi/helper-plugin';


export default {
  register (app: any) {
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
                  intlLabel: {
                    id: getTrad('advancedOptions.apiFields'),
                    defaultMessage: 'Array of api fields to get from API',
                  },
                  description: {
                    id: getTrad('advancedOptions.apiFieldsDescription'),
                    defaultMessage: 'Default value: []. More fields you can find here there: https://restcountries.com. Note: fields "flag" and "name" will be always get from API.',
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
          defaultMessage: `multi-${ pluginMeta.id }`,
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
                  intlLabel: {
                    id: getTrad('advancedOptions.apiFields'),
                    defaultMessage: 'Array of api fields to get from API',
                  },
                  description: {
                    id: getTrad('advancedOptions.apiFieldsDescription'),
                    defaultMessage: 'Default value: []. More fields you can find here there: https://restcountries.com. Note: fields "flag" and "name" will be always get from API.',
                  },
                },
              ],
            },
          ],
        },
      },
    ]);
  },

  bootstrap (app: any) { console.info(app); },

  async registerTrads ({ locales }: any) {
    const importedTrads = await Promise.all(
      locales.map((locale: any) => import(
        /* webpackChunkName: "translation-[request]" */ `./translations/${ locale }.json`
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
