import { IOC } from '.'
import { Application, ServiceProvider } from '../foundation'
import { ConsoleMailerAdapter } from './adapters/ConsoleMailerAdapter'
import { SmtpMailerAdapter } from './adapters/SmtpMailerAdapter'
import { Mailer } from './Mailer'
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
                            case MailerType.CONSOLE: return new ConsoleMailerAdapter(app.ioc.get(Symbol.for('Risio:Logger')))
                            case MailerType.SMTP: return new SmtpMailerAdapter(config)
                        }
                    })
                    .inSingletonScope()
                    .whenTargetNamed(name)
            }
        }
    }

}
