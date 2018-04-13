import { ConsoleMailerAdapterConfig } from './adapters/ConsoleMailerAdapter'
import { SmtpMailerAdapterConfig } from './adapters/SmtpMailerAdapter'

export enum MailerType {
    CONSOLE = 'dummy',
    SMTP = 'smtp'
}

export interface MailerConfig {
    defaults?: {
        fromName?: string
        fromEmail?: string
    }

    adapter: string
    adapters: {
        [s: string]: (SmtpMailerAdapterConfig | ConsoleMailerAdapterConfig) & { adapter: MailerType }
    }
}
