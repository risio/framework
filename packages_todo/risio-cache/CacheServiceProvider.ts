import * as Redis from 'ioredis'
import { Filesystem, FilesystemType } from '../filesystem'
import { LocalFilesystemAdapter } from '../filesystem/adapters/LocalFilesystemAdapter'
import { Application, ServiceProvider } from '../foundation'

import { Cache } from './Cache'
import { CacheAdapterConfig, CacheAdapterType } from './CacheConfig'

import { CacheAdapter } from './adapters/CacheAdapter'
import { FileCacheAdapter } from './adapters/FileCacheAdapter'
import { NoopCacheAdapter } from './adapters/NoopCacheAdapter'
import { RedisCacheAdapter } from './adapters/RedisCacheAdapter'

export class CacheServiceProvider extends ServiceProvider {

    public register(app: Application): void {
        const drivers = app.config.cache.drivers

        for (const driver in drivers) {
            if (drivers.hasOwnProperty(driver)) {
                app.singleton<Cache>(`cache.${driver}`, app => {
                    const driverConfig = drivers[driver]
                    const adapter = this.getAdapter(app, driverConfig)

                    return new Cache(adapter)
                })
            }
        }
    }

    public getAdapter(app: Application, config: CacheAdapterConfig): CacheAdapter {
        switch (config.adapter) {
            case CacheAdapterType.NOOP: return new NoopCacheAdapter()
            case CacheAdapterType.FILE: return new FileCacheAdapter(
                new Filesystem(new LocalFilesystemAdapter({ adapter: FilesystemType.LOCAL, basePath: config.basePath }))
            )
            case CacheAdapterType.REDIS: return new RedisCacheAdapter(
                new Redis(config.port, config.host)
            )
        }
    }

}
