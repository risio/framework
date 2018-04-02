import { FilesystemServiceProvider } from '@risio/filesystem'
import { Application, ApplicationConfig } from '@risio/foundation'
import { Container } from 'inversify'

import { filesystemConfig } from '../config/filesystem'

// import { LoggerServiceProvider } from '../log'
// import { MailerServiceProvider } from '../mail'
// import { logConfig } from './config/log'
// import { mailConfig } from './config/mail'

let instance: Application = null

export const app = (applicationConfig?: ApplicationConfig) => {
    if (instance === null) {
        const container = new Container()

        instance = new Application(container, applicationConfig)

        instance.register(new FilesystemServiceProvider(filesystemConfig))
        // instance.register(new LoggerServiceProvider(logConfig))
        // instance.register(new MailerServiceProvider(mailConfig))
        // instance.register(new CacheServiceProvider)
        // instance.register(new ConsoleServiceProvider)

        instance.boot()
    }

    return instance
}
