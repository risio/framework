import { Application, env } from '@risio/foundation'
import { LoggerType, LoggerLevel } from '../../log'

export const logConfig = Application.createConfigObject({
    adapter: env('LOG', 'console'),

    adapters: {
        console: {
            adapter: LoggerType.CONSOLE,
            level: env('LOG_LEVEL', LoggerLevel.DEBUG)
        },
    }
})
