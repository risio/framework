import * as Redis from 'ioredis'
import * as sha1 from 'sha1'

import { CacheAdapterType } from '../CacheConfig'

import { CacheAdapter } from './CacheAdapter'

export class RedisCacheAdapterConfig {
    public adapter: CacheAdapterType.REDIS
    public host?: string = '127.0.0.1'
    public port?: number = 6379
    public options?: Redis.RedisOptions = {}
}

export class RedisCacheAdapter implements CacheAdapter {

    constructor(private redis: Redis.Redis) {}

    public async get(key: string): Promise<string> {
        return this.redis.get(key)
    }

    public async set(key: string, value: string): Promise<void> {
        return this.redis.set(key, value)
    }

    public async forget(key: string): Promise<void> {
        await this.redis.del(key)
    }

    public async flush(): Promise<void> {
        await this.redis.flushall()
    }

    public async remember(key: string, seconds: number, callback: () => Promise<string>): Promise<string> {
        if (! await this.redis.exists(this.getCacheFilePath(key))) {
            return this.renewRemember(key, callback)
        }

        const content = await this.redis.get(this.getCacheFilePath(key))
        const timestamp = content.substr(0, 13)

        // tslint:disable-next-line:binary-expression-operand-order
        if (parseInt(timestamp, 10) < Date.now() - (1000 * seconds)) {
            return this.renewRemember(key, callback)
        }

        return content.substr(13)
    }

    private async renewRemember(key, callback: () => Promise<string>): Promise<string> {
        const data = await callback()

        await this.redis.set(this.getCacheFilePath(key), Date.now() + JSON.stringify(data))

        return data
    }

    private getCacheFilePath(key: string): string {
        return sha1(key)
    }

}
