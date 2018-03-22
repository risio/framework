import { IOC } from '.'
import { Application, ServiceProvider } from '../foundation'
import { Filesystem } from './Filesystem'
import { FilesystemConfig, FilesystemType } from './FilesystemConfig'
import { LocalFilesystemAdapter } from './adapters/LocalFilesystemAdapter'
import { S3FilesystemAdapter } from './adapters/S3FilesystemAdapter'

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
                            case FilesystemType.LOCAL: return new LocalFilesystemAdapter(config)
                            case FilesystemType.S3: return new S3FilesystemAdapter(config)
                        }
                    })
                    .inSingletonScope()
                    .whenTargetNamed(name)
            }
        }
    }

}
