import * as path from 'path'
import { ApplicationConfig, env } from '@risio/foundation'

export const applicationConfig: ApplicationConfig = {
    env: env('ENV', 'development'),
    url: env('APP_URL', 'http://localhost:3000'),
    port: env('PORT', 5000),
    key: env('SECRET', 'this-is-not-a-secret'),
    basePath: path.join(__dirname, '..')
}
