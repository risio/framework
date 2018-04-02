// const fs = jest.mock('fs-extra', () => ({
//     createReadStream: jest.fn().mockReturnValue('bar')
// }))

// import { FilesystemAdapter, FilesystemAdapterType, LocalFilesystemAdapter } from '@risio/filesystem'

// test('can read a file', async () => {
//     const filesystem = getLocalFilesystem()

//     expect(await filesystem.read('foo')).toEqual('bar')
// })

// function getLocalFilesystem() {
//     return new LocalFilesystemAdapter({ adapter: FilesystemAdapterType.LOCAL, basePath: '.' })
// }
