import { Application } from './Application';
export declare abstract class ServiceProvider {
    boot(app: Application): void;
    abstract register(app: Application): void;
}
