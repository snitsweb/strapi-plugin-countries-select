"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const plugin_meta_1 = __importDefault(require("../plugin-meta"));
const register = ({ strapi }) => {
    strapi.customFields.register({
        name: 'select',
        plugin: plugin_meta_1.default.id,
        type: 'json',
        inputSize: {
            default: 6,
            isResizable: true,
        },
    });
    strapi.customFields.register({
        name: 'multiselect',
        plugin: plugin_meta_1.default.id,
        type: 'json',
        inputSize: {
            default: 6,
            isResizable: true,
        },
    });
};
exports.register = register;
