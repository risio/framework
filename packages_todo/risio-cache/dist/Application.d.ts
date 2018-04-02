import 'reflect-metadata';
import { interfaces } from 'inversify';
import { ApplicationConfig } from './ApplicationConfig';
import { ServiceProvider } from './ServiceProvider';
export declare class Application {
    /**
     * The application configuration
     */
    config: ApplicationConfig;
    /**
     * The path to the application root
     */
    basePath: string;
    /**
     * The service providers registered with the application
     */
    serviceProviders: ServiceProvider[];
    /**
     * The IoC container for this application
     */
    ioc: interfaces.Container;
    /**
     * Create a new Application
     *
     * @param config
     */
    constructor(container: interfaces.Container, config: ApplicationConfig);
    /**
     * Register a service provider with the application
     */
    register(serviceProvider: ServiceProvider): void;
    /**
     * Boot the application. This should be called after all providers are registered
     */
    boot(): void;
}
