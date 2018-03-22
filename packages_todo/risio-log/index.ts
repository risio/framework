export const IOC = {
    Logger: Symbol.for('Risio:Logger')
}

export * from './LoggerConfig'
export { Logger } from './Logger'
export { LoggerServiceProvider } from './LoggerServiceProvider'
