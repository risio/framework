import { ConsoleLoggerAdapterConfig } from './adapters/ConsoleLoggerAdapter'

export enum LoggerLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
}

export enum LoggerType {
    CONSOLE = 'console'
}

export interface LoggerConfig {
    adapter: string
    adapters: {
        [s: string]: ConsoleLoggerAdapterConfig
    }
}
