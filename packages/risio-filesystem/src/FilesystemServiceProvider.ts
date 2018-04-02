import { Application, Filesystem, ServiceProvider } from '@risio/foundation'

import { IOC } from '.'
import { LocalFilesystemAdapter, LocalFilesystemAdapterConfig } from './adapters/LocalFilesystemAdapter'
import { S3FilesystemAdapter, S3FilesystemAdapterConfig } from './adapters/S3FilesystemAdapter'
import { FilesystemConfig, FilesystemType } from './FilesystemConfig'

export class FilesystemServiceProvider extends ServiceProvider {

    constructor(private config: FilesystemConfig) {
        super()
    }

    public register(app: Application): void {
        for (const name in this.config.adapters) {
            if (this.config.adapters.hasOwnProperty(name)) {
                const config = this.config.adapters[name]

                app.ioc.bind<Filesystem>(IOC.Filesystem)
                    .toDynamicValue(() => {
                        switch (config.adapter) {
                            case FilesystemType.LOCAL: return new LocalFilesystemAdapter(config as LocalFilesystemAdapterConfig)
                            case FilesystemType.S3: return new S3FilesystemAdapter(config as S3FilesystemAdapterConfig)
                        }
                    })
                    .inSingletonScope()
                    .whenTargetNamed(name)
            }
        }
    }

}
