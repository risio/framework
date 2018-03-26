import 'reflect-metadata'

import { interfaces } from 'inversify'

import { ApplicationConfig } from './ApplicationConfig'
import { ServiceProvider } from './ServiceProvider'
import _ = require('lodash');

export class Application {

    /**
     * The application configuration
     */
    public config: ApplicationConfig

    /**
     * The path to the application root
     */
    public basePath: string

    /**
     * The service providers registered with the application
     */
    public serviceProviders: ServiceProvider[] = []

    /**
     * The IoC container for this application
     */
    public ioc: interfaces.Container

    /**
     * Create a new Application
     *
     * @param config
     */
    constructor(container: interfaces.Container, config: ApplicationConfig) {
        this.config = config
        this.basePath = this.config.basePath
        this.ioc = container
    }

    /**
     * Register a service provider with the application
     */
    public register(serviceProvider: ServiceProvider) {
        if (this.serviceProviders.includes(serviceProvider)) {
            throw new Error(`Service provider ${serviceProvider} was already registered`)
        }

        this.serviceProviders.push(serviceProvider)
    }

    /**
     * Boot the application. This should be called after all providers are registered
     */
    public boot() {
        this.serviceProviders.forEach(serviceProvider => {
            serviceProvider.register(this)
        })

        this.serviceProviders.forEach(serviceProvider => {
            serviceProvider.boot(this)
        })
    }

}
