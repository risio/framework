"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = jest.mock('fs-extra', () => ({
    createReadStream: jest.fn().mockReturnValue('bar')
}));
const filesystem_1 = require("@risio/filesystem");
test('can read a file', async () => {
    const filesystem = getLocalFilesystem();
    expect(await filesystem.read('foo')).toEqual('bar');
});
function getLocalFilesystem() {
    return new filesystem_1.LocalFilesystemAdapter({ adapter: filesystem_1.FilesystemAdapterType.LOCAL, basePath: '.' });
}
