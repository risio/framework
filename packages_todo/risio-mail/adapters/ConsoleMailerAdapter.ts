import chalk from 'chalk'
import outdent from 'outdent'

import { Logger } from '../../log'
import { Mail } from '../Mail'
import { Mailer } from '../Mailer'
import { MailerType } from '../MailerConfig'

export interface ConsoleMailerAdapterConfig {
    adapter: MailerType.CONSOLE
}

export class ConsoleMailerAdapter implements Mailer {

    constructor(private logger: Logger) {}

    public async send(mail: Mail): Promise<boolean> {
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
