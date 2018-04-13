export const IOC = {
    Mailer: Symbol.for('Risio:Mailer')
}

export * from './MailerConfig'
export { MailerServiceProvider } from './MailerServiceProvider'
