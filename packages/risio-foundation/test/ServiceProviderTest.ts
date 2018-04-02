import { Application, ServiceProvider } from '../src'

class TestServiceProvider extends ServiceProvider {
    public register(app: Application): void {
        throw new Error("Method not implemented.");
    }
}

describe('ServiceProvider', () => {
    it('can create a new service provider', async () => {
        const serviceProvider = new TestServiceProvider()
        expect(serviceProvider).toBeTruthy()
    })

    it('can boot a service provider', async () => {
        const app = new (jest.fn<Application>())
        const serviceProvider = new TestServiceProvider()

        expect(serviceProvider.boot(app)).toBeUndefined()
    })
})
