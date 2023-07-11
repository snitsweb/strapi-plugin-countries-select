"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountriesControllerBuilder = void 0;
const plugin_meta_1 = __importDefault(require("../../plugin-meta"));
class CountriesController {
    constructor({ strapi }) {
        this.strapi = strapi;
    }
    async findMany(ctx) {
        ctx.body = await this.strapi
            .plugin(plugin_meta_1.default.id)
            .service('CountriesService')
            .findMany(ctx.query)
            .catch((err) => ctx.throw(500, err));
    }
}
const CountriesControllerBuilder = (props) => new CountriesController(props);
exports.CountriesControllerBuilder = CountriesControllerBuilder;
