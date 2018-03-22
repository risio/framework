import { CacheAdapterType } from '../CacheConfig'

import { CacheAdapter } from './CacheAdapter'

export interface NoopCacheAdapterConfig {
    adapter: CacheAdapterType.NOOP
}

export class NoopCacheAdapter implements CacheAdapter {

    public async get(key: string): Promise<string> {
        return undefined
    }

    public async set(key: string, value: string): Promise<void> {
        // no-op
    }

    public async forget(key: string): Promise<void> {
        // no-op
    }

    public async flush(): Promise<void> {
        // no-op
    }

    public async remember(key: string, seconds: number, callback: () => Promise<string>): Promise<string> {
        return callback()
    }

}
