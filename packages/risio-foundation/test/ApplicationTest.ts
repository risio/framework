import { Application } from '../src'

test('can create a new application', async () => {
    const app = new Application({}, {})

    expect(app).toBeTruthy()
})
