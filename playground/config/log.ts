import { env } from '../../foundation'
import { LoggerType, LoggerLevel } from '../../log'

export const logConfig = Object.freeze({
    adapter: env('LOG', 'console'),

    adapters: {
        console: {
            adapter: LoggerType.CONSOLE,
            level: env('LOG_LEVEL', LoggerLevel.DEBUG)
        },
    }
})
