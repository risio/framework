import * as IORedis from 'ioredis'

import { Cache } from '../../Cache'
import { RedisCacheAdapter } from '../../adapters/RedisCacheAdapter'

test('can set / get', async () => {
    const { cache, redis } = getRedisCache({
        set: jest.fn(),
        get: jest.fn().mockReturnValueOnce('bar')
    })

    await cache.set('foo', 'bar')
    expect(await cache.get('foo')).toEqual('bar')

    expect(redis.set).toBeCalledWith('foo', 'bar')
    expect(redis.get).toBeCalledWith('foo')
})

test('can forget', async () => {
    const { cache, redis } = getRedisCache({
        del: jest.fn()
    })

    await cache.forget('foo')

    expect(redis.del).toBeCalledWith('foo')
})

test('can flush', async () => {
    const { cache, redis } = await getRedisCache({
        flushall: jest.fn()
    })

    await cache.flush()

    expect(redis.flushall).toBeCalled()
})

function getRedisCache(methods = {}) {
    const redis = new (jest.fn<IORedis.Redis>(() => methods))
    const cache = new Cache(new RedisCacheAdapter(redis))
    return { redis, cache }
}
