import 'reflect-metadata'

import { ApplicationConfig } from './ApplicationConfig'
import { ServiceProvider } from './ServiceProvider'
import { Container } from './Container';

export class Application {

    /**
     * The application configuration
     */
    readonly config: ApplicationConfig

    /**
     * The service providers registered with the application
     */
    readonly serviceProviders: ServiceProvider[] = []

    /**
     * The IoC container for this application
     */
    readonly ioc: Container

    /**
     * Create a new Application
     *
     * @param config
     */
    constructor(container: Container, config: ApplicationConfig) {
        this.config = config
        this.ioc = container
    }

    /**
     * Register a service provider with the application
     */
    public register(serviceProvider: ServiceProvider) {
        if (this.serviceProviders.includes(serviceProvider)) {
            throw new Error(`Service provider ${serviceProvider.constructor.name} was already registered`)
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
