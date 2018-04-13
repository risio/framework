export const IOC = {
    Logger: Symbol.for('Risio:Logger')
}

export * from './LoggerConfig'
export { LoggerServiceProvider } from './LoggerServiceProvider'

export { ConsoleLoggerAdapter } from './adapters/ConsoleLoggerAdapter'
