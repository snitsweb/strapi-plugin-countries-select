import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginMeta from '../../plugin-meta';

export default {
  register(app) {
    app.customFields.register([
      {
        name: 'select',
        pluginId: pluginMeta.id,
        type: 'json',
        icon: undefined,
        intlLabel: {
          id: `${pluginMeta.id}.plugin.name`,
          defaultMessage: pluginMeta.name,
        },
        intlDescription: {
          id: `${pluginMeta.id}.plugin.description`,
          defaultMessage: pluginMeta.description,
        },
        components: {
          Input: async () => import('./components/Input'),
        },
        options: {
          base: [
            {
              sectionTitle: {
                id: `${pluginMeta.id}.baseOptions`,
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
                    defaultMessage: "You won't be able to create an entry if this field is empty",
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
