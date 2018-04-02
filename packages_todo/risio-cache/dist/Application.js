"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
class Application {
    /**
     * Create a new Application
     *
     * @param config
     */
    constructor(container, config) {
        /**
         * The service providers registered with the application
         */
        this.serviceProviders = [];
        this.config = config;
        this.basePath = this.config.basePath;
        this.ioc = container;
    }
    /**
     * Register a service provider with the application
     */
    register(serviceProvider) {
        this.serviceProviders.push(serviceProvider);
    }
    /**
     * Boot the application. This should be called after all providers are registered
     */
    boot() {
        this.serviceProviders.forEach(serviceProvider => {
            serviceProvider.register(this);
        });
        this.serviceProviders.forEach(serviceProvider => {
            serviceProvider.boot(this);
        });
    }
}
exports.Application = Application;
