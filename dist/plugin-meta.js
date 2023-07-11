"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = exports.displayName = exports.id = void 0;
const pluginPkg = require('../package.json');
exports.id = pluginPkg.strapi.name.replace(/^(@[^-,.][\w,-]+\/|strapi-)plugin-/i, '');
exports.displayName = pluginPkg.strapi.displayName;
exports.description = pluginPkg.strapi.description;
exports.default = {
    id: exports.id,
    displayName: exports.displayName,
    description: exports.description,
};
