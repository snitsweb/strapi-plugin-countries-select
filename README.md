# Strapi countries select plugin

Simple Strapi 4 plugin with custom fields for countries and additional information

### Single country input preview
![Plugin preview](docs/input-preview.png)

### Multi country input preview
![Plugin preview](docs/multi-input-preview.png)

#### This plugin also support dark and light theme modes.

## Installation

To install the Strapi Advanced UUID Plugin, simply run one of the following command:

```
npm install @snitsweb/strapi-plugin-countries-select
```
```
yarn add @snitsweb/strapi-plugin-countries-select
```

Then you need to specify in project/config/plugins:
```typescript
module.exports = ({ env }) => ({
  ...,
  'countries-plugin': {
      enabled: true,
      countriesApiURL: 'https://restcountries.com/v3.1/all',
  }
})
```

Variable **countriesApiURL** is set buy default, if you want to change request endpoint, you can pass to it other url.
