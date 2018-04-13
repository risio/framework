import chalk from 'chalk'
import * as winston from 'winston'
import { Logger } from '@risio/foundation'

import { LoggerLevel } from '../LoggerConfig'

export interface ConsoleLoggerAdapterConfig {
    level: LoggerLevel
}

export class ConsoleLoggerAdapter implements Logger {

    private logger: winston.LoggerInstance

    constructor(config: ConsoleLoggerAdapterConfig) {
        const transports = []

        transports.push(new (winston.transports.Console)({
            level: config.level,
            timestamp: () => {
                return new Date().toISOString()
            },
            formatter: options => {
                const level = winston.config.colorize(options.level, options.level.toUpperCase().padEnd(5))
                const timestamp = options.timestamp()
                const message = options.message
                const meta = options.meta && Object.keys(options.meta).length ? `\n${JSON.stringify(options.meta, null, 4)}` : ''

                return `${level} ${chalk.gray(timestamp)} ${message} ${chalk.gray(meta)}`
            }
        }))

        this.logger = new (winston.Logger)({ transports })
    }

    public debug(message: string, meta?: object): void {
        this.logger.debug(message, meta)
    }
    public info(message: string, meta?: object): void {
        this.logger.info(message, meta)
    }
    public warn(message: string, meta?: object): void {
        this.logger.warn(message, meta)
    }
    public error(message: string, meta?: object): void {
        this.logger.error(message, meta)
    }

}
