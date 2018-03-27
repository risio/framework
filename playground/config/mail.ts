import { MailerType, MailerConfig } from '../../mail'
import { env } from '@risio/foundation'

export const mailConfig: MailerConfig = Object.freeze({
    defaults: {
        fromName: 'John Doe',
        fromEmail: 'noreply@example.com'
    },

    adapter: env('MAIL', 'dummy'),

    adapters: {
        dummy: {
            adapter: MailerType.CONSOLE
        },

        smtp: {
            adapter: MailerType.SMTP,
            host: env('MAIL_SMTP_HOST', 'smtp.mailtrap.io'),
            port: env('MAIL_SMTP_PORT', 2525),
            secure: false,
            auth: {
                username: env('MAIL_SMTP_AUTH_USERNAME'),
                password: env('MAIL_SMTP_AUTH_PASSWORD'),
            }
        }
    }
})
