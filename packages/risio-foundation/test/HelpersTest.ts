import { env } from '../src'

describe('env', () => {
    it('reads from process.env', () => {
        delete process.env.KEY
        process.env.KEY = 'value'
        expect(env('KEY')).toBe('value')
        delete process.env.KEY
    })

    it('returns a default value if the requested key is non-existent', () => {
        delete process.env.KEY
        expect(env('KEY', 'default')).toBe('default')
        process.env.KEY = 'value'
        expect(env('KEY', 'default')).toBe('value')
        delete process.env.KEY
    })
})
