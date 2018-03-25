import * as path from 'path'

import { FilesystemConfig, FilesystemType } from '../../filesystem'
import { env } from '@risio/foundation'

export const filesystemConfig: Readonly<FilesystemConfig> = {
    adapter: env('FILESYSTEM', 'local'),

    adapters: {
        local: {
            adapter: FilesystemType.LOCAL,
            basePath: path.join(__dirname, '..', '.storage/uploads'),
            baseUrl: env('FILESYSTEM_LOCAL_BASE_URL', 'http://localhost:5000/uploads/')
        },

        s3: {
            adapter: FilesystemType.S3,
            bucket: env('FILESYSTEM_S3_BUCKET_NAME'),
            region: env('FILESYSTEM_S3_REGION'),
            accessKeyId: env('FILESYSTEM_S3_ACCESS_KEY_ID'),
            secretAccessKey: env('FILESYSTEM_S3_SECRET_ACCESS_KEY'),
            basePath: 'public'
        }
    }
},
