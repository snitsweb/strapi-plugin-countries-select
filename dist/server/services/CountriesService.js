"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountriesServiceBuilder = void 0;
const plugin_meta_1 = __importDefault(require("../../plugin-meta"));
const axios_1 = __importDefault(require("axios"));
class CountriesService {
    constructor({ strapi }) {
        this.strapi = strapi;
    }
    async findMany({ apiFields = 'name, flag' }) {
        const apiURL = `${this.strapi.plugin(plugin_meta_1.default.id).config('countriesApiURL')}?fields=${apiFields}`;
        const { data } = await axios_1.default.get(apiURL);
        if (!data)
            throw new Error('Something went wrong when fetching data from countries API');
        return data;
    }
}
const CountriesServiceBuilder = (props) => new CountriesService(props);
exports.CountriesServiceBuilder = CountriesServiceBuilder;
