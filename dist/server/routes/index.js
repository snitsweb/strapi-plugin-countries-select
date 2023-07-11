"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
exports.routes = [
    {
        method: 'GET',
        path: '/countries',
        handler: 'CountriesController.findMany',
        config: {
            policies: [],
            auth: false,
        },
    },
];
