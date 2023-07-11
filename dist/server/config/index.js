"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    default: {
        countriesApiURL: 'https://restcountries.com/v3.1/all',
    },
    validator(config) {
        if (!config.countriesApiURL)
            throw new Error('Field countriesApiURL can not be falsy!');
    },
};
