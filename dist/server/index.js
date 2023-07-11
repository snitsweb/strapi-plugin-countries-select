"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = require("./register");
const bootstrap_1 = require("./bootstrap");
const destroy_1 = require("./destroy");
const config_1 = require("./config");
const content_types_1 = require("./content-types");
const controllers_1 = require("./controllers");
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
const policies_1 = require("./policies");
const services_1 = require("./services");
exports.default = {
    register: register_1.register,
    bootstrap: bootstrap_1.bootstrap,
    destroy: destroy_1.destroy,
    config: config_1.config,
    controllers: controllers_1.controllers,
    routes: routes_1.routes,
    services: services_1.services,
    contentTypes: content_types_1.contentTypes,
    policies: policies_1.policies,
    middlewares: middlewares_1.middlewares,
};
