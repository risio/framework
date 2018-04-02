import { CacheAdapter } from './adapters/CacheAdapter'

export class Cache implements CacheAdapter {

    constructor(
        private adapter: CacheAdapter
    ) {}

    public async get(key: string): Promise<string> {
        return this.adapter.get(key)
    }

    public async set(key: string, content: string): Promise<void> {
        await this.adapter.set(key, content)
    }

    public async forget(key: string): Promise<void> {
        await this.adapter.forget(key)
    }

    public async flush(): Promise<void> {
        await this.adapter.flush()
    }

    public async remember(key: string, seconds: number, callback: () => Promise<string>): Promise<string> {
        return this.adapter.remember(key, seconds, callback)
    }

}
