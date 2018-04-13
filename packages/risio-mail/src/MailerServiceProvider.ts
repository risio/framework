import { Application, Mailer, ServiceProvider } from '@risio/foundation'
import { ConsoleLoggerAdapter, LoggerLevel } from '@risio/log'

import { IOC } from '.'
import { ConsoleMailerAdapter, ConsoleMailerAdapterConfig } from './adapters/ConsoleMailerAdapter'
import { SmtpMailerAdapter, SmtpMailerAdapterConfig } from './adapters/SmtpMailerAdapter'
import { MailerConfig, MailerType } from './MailerConfig'

export class MailerServiceProvider extends ServiceProvider {

    constructor(private config: MailerConfig) {
        super()
    }

    public register(app: Application): void {
        for (const name in this.config.adapters) {
            if (this.config.adapters.hasOwnProperty(name)) {
                const config = this.config.adapters[name]

                app.ioc.bind<Mailer>(IOC.Mailer)
                    .toDynamicValue(() => {
                        switch (config.adapter) {
                            case MailerType.CONSOLE: return new ConsoleMailerAdapter(config as ConsoleMailerAdapterConfig, new ConsoleLoggerAdapter({ level: LoggerLevel.DEBUG }))
                            case MailerType.SMTP: return new SmtpMailerAdapter(config as SmtpMailerAdapterConfig)
                        }
                    })
                    .inSingletonScope()
                    .whenTargetNamed(name)
            }
        }
    }

}
