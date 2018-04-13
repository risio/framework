import * as nodemailer from 'nodemailer'
import { Mail, Mailer } from '@risio/foundation'

export interface SmtpMailerAdapterConfig {
    host: string
    port: number
    secure: boolean
    auth?: {
        username: string
        password: string
    }
}

export class SmtpMailerAdapter implements Mailer {

    constructor(private config: SmtpMailerAdapterConfig) {}

    public async send(mail: Mail): Promise<boolean> {
        const transporter = this.createNodemailerTransporter()

        const options = {
            from: `"${mail.fromName}" <${mail.fromEmail}>`,
            to: mail.to instanceof Array ? mail.to.join(', ') : mail.to,
            subject: mail.subject,
            html: mail.html,
        }

        return new Promise<boolean>((resolve, reject) => {
            transporter.sendMail(options, (error, info) => {
                if (error) {
                    throw new Error(error.message)
                }

                resolve(true)
            })
        })
    }

    /**
     * Create the nodemailer transport
     */
    private createNodemailerTransporter() {
        const options: any = {
            host: this.config.host,
            port: this.config.port,
            secure: this.config.secure || false,
        }

        if (this.config.auth) {
            options.auth = {
                user: this.config.auth.username,
                pass: this.config.auth.password,
            }
        }

        return nodemailer.createTransport(options)
    }

}
