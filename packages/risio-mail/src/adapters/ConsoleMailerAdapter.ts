import chalk from 'chalk'
import outdent from 'outdent'
import { Mail, Mailer, Logger } from '@risio/foundation'

export interface ConsoleMailerAdapterConfig {

}

export class ConsoleMailerAdapter implements Mailer {

    constructor(
        private config: ConsoleMailerAdapterConfig,
        private logger: Logger
    ) {}

    public async send(mail: Mail): Promise<boolean> {
        this.config

        this.logger.info(outdent`\n
        ============ BEGIN MAIL ============
            Subject: ${chalk.gray(mail.subject)}
            From: ${chalk.gray(`${mail.fromName} <${mail.fromEmail}>`)}
            To: ${chalk.gray(mail.to instanceof Array ? mail.to.join(', ') : mail.to)}

            ${chalk.gray(mail.html)}
        ============ END MAIL ==============`)

        return true
    }

}
