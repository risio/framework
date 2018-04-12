// const fs = jest.mock('fs-extra', () => ({
//     createReadStream: jest.fn().mockReturnValue('bar')
// }))

// import { FilesystemAdapter, FilesystemAdapterType, LocalFilesystemAdapter } from '@risio/filesystem'

test('true', async () => {
    expect(true).toBeTruthy()
})

// function getLocalFilesystem() {
//     return new LocalFilesystemAdapter({ adapter: FilesystemAdapterType.LOCAL, basePath: '.' })
// }
