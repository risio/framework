import { env } from '@risio/foundation'
import { LoggerType, LoggerLevel } from '@risio/log'

export const logConfig = Object.freeze({
    adapter: env('LOG', 'console'),

    adapters: {
        console: {
            adapter: LoggerType.CONSOLE,
            level: env('LOG_LEVEL', LoggerLevel.DEBUG)
        },
    }
})
