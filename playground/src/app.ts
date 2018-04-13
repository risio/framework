import { LoggerServiceProvider } from '@risio/log'
import { MailerServiceProvider } from '@risio/mail'
import { FilesystemServiceProvider } from '@risio/filesystem'
import { Application, ApplicationConfig } from '@risio/foundation'
import { Container } from 'inversify'

import { logConfig } from '../config/log'
import { filesystemConfig } from '../config/filesystem'
import { mailConfig } from '../config/mail'


let instance: Application = null

export const app = (applicationConfig?: ApplicationConfig) => {
    if (instance === null) {
        const container = new Container()

        instance = new Application(container, applicationConfig)

        instance.register(new LoggerServiceProvider(logConfig))
        instance.register(new MailerServiceProvider(mailConfig))
        instance.register(new FilesystemServiceProvider(filesystemConfig))
        // instance.register(new CacheServiceProvider)
        // instance.register(new ConsoleServiceProvider)

        instance.boot()
    }

    return instance
}
