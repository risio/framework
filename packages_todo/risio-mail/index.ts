export const IOC = {
    Mailer: Symbol.for('Risio:Mailer')
}

export * from './MailerConfig'
export { Mail } from './Mail'
export { Mailer } from './Mailer'
export { MailerServiceProvider } from './MailerServiceProvider'
