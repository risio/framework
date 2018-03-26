import { Application, ServiceProvider } from '../src'

test('can create a new application', async () => {
    const app = new Application({}, {})

    expect(app).toBeTruthy()
})

test('can register a service provider', async () => {
    const app = new Application({}, {})

    const serviceProvider = jest.fn<ServiceProvider>()

    app.register(serviceProvider)
})
