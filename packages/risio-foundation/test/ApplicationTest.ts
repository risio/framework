import { Application, ApplicationConfig, Container, ServiceProvider } from '../src'

const container = new (jest.fn<Container>().mockImplementation(() => ({

})))

const serviceProvider = new (jest.fn<ServiceProvider>().mockImplementation(() => ({
    register: jest.fn(),
    boot: jest.fn()
})))

const config: ApplicationConfig = {
    env: 'test',
    url: 'http://localhost',
    port: 3000,
    key: 'this-is-a-test-key',
    basePath: '.storage'
}

describe('Application', () => {
    it('can create a new application', async () => {
        const app = new Application(container, config)

        expect(app).toBeTruthy()
        expect(app.ioc).toBe(container)
        expect(app.config).toBe(config)
    })

    it('can register a service provider', async () => {
        const app = new Application(container, config)

        app.register(serviceProvider)
        app.boot()

        expect(serviceProvider.register).toHaveBeenCalledTimes(1)
        expect(serviceProvider.boot).toHaveBeenCalledTimes(1)
    })

    it('cannot register same service provider twice', async () => {
        const app = new Application(container, config)

        app.register(serviceProvider)

        expect(() => app.register(serviceProvider)).toThrowError()
    })
})
