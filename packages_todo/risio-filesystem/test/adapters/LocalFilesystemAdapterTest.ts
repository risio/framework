const fs = jest.mock('fs-extra', () => ({
    createReadStream: jest.fn().mockReturnValue('bar')
}))

import { Cache } from '../../../cache'
import { FilesystemAdapter, FilesystemAdapterType, LocalFilesystemAdapter } from '../..'

test('can read a file', async () => {
    const filesystem = getLocalFilesystem()

    expect(await filesystem.read('foo')).toEqual('bar')
})

function getLocalFilesystem() {
    return new LocalFilesystemAdapter({ adapter: FilesystemAdapterType.LOCAL, basePath: '.' })
}
