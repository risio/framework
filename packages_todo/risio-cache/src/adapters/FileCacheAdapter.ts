import * as getRawBody from 'raw-body'
import * as sha1 from 'sha1'

import { Filesystem } from '../../filesystem'
import { CacheAdapterType } from '../CacheConfig'

import { CacheAdapter } from './CacheAdapter'

export interface FileCacheAdapterConfig {
    adapter: CacheAdapterType.FILE,
    basePath: string
}

export class FileCacheAdapter implements CacheAdapter {

    constructor(private filesystem: Filesystem) {}

    public async get(key: string): Promise<string> {
        if (await this.filesystem.exists(this.getCacheFilePath(key))) {
            return (await getRawBody(await this.filesystem.read(this.getCacheFilePath(key)))).toString()
        }
    }

    public async set(key: string, value: string): Promise<void> {
        await this.filesystem.write(this.getCacheFilePath(key), value)
    }

    public async forget(key: string): Promise<void> {
        if (await this.filesystem.exists(this.getCacheFilePath(key))) {
            await this.filesystem.delete(this.getCacheFilePath(key))
        }
    }

    public async flush(): Promise<void> {
        await this.filesystem.deleteDirectory('.')
    }

    public async remember(key: string, seconds: number, callback: () => Promise<string>): Promise<string> {
        if (! await this.filesystem.exists(this.getCacheFilePath(key))) {
            return this.renewRemember(key, callback)
        }

        const content = await this.get(key)
        const timestamp = content.substr(0, 13)

        // tslint:disable-next-line:binary-expression-operand-order
        if (parseInt(timestamp, 10) < Date.now() - (1000 * seconds)) {
            return this.renewRemember(key, callback)
        }

        return JSON.parse(content.substr(13))
    }

    private async renewRemember(key, callback: () => Promise<string>): Promise<string> {
        const data = await callback()

        await this.filesystem.write(this.getCacheFilePath(key), Date.now() + JSON.stringify(data))

        return data
    }

    private getCacheFilePath(key: string): string {
        return sha1(key)
    }

}
