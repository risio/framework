jest.mock('raw-body', () => {
    return () => 'bar'
})

jest.mock('sha1', () => {
    return () => 'foo-sha1'
})

import { Cache } from '../../cache'
import { FileCacheAdapter } from '../../adapters/FileCacheAdapter'
import { Filesystem } from '../../../filesystem'

test('can get and set a value in the cache', async () => {
    const { cache, filesystem } = getFileCache({
        read: jest.fn(),
        write: jest.fn(),
        exists: jest.fn().mockReturnValue(true)
    })

    await cache.set('foo', 'bar')
    await cache.get('foo')

    expect(filesystem.write).toBeCalledWith('foo-sha1', 'bar')
    expect(filesystem.read).toBeCalledWith('foo-sha1')
})

test('can forget a value from the cache', async () => {
    const { cache, filesystem } = getFileCache({
        exists: jest.fn().mockReturnValue(true),
        delete: jest.fn(),
    })

    await cache.forget('foo')

    expect(filesystem.exists).toBeCalled()
    expect(filesystem.delete).toBeCalledWith('foo-sha1')
})

test('can flush all values from the cache', async () => {
    const { cache, filesystem } = getFileCache({
        deleteDirectory: jest.fn()
    })

    await cache.flush()

    expect(filesystem.deleteDirectory).toBeCalledWith('.')
})

function getFileCache(methods = {}) {
    const filesystem = new (jest.fn<Filesystem>(() => methods))
    const cache = new Cache(new FileCacheAdapter(filesystem))
    return { cache, filesystem }
}
