import { Cache } from '../../cache'
import { NoopCacheAdapter } from '../../adapters/NoopCacheAdapter'

test('can set a value in the cache, but a get should always return undefined', async () => {
    const { cache } = getNoopCache()
    await cache.set('foo', 'bar')
    expect(await cache.get('foo')).toBeUndefined()
    expect(await cache.get('baz')).toBeUndefined()
})

function getNoopCache() {
    const cache = new Cache(new NoopCacheAdapter())
    return { cache }
}
