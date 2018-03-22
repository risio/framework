import * as path from 'path'

import { ApplicationConfig, env } from '../../foundation'

export const applicationConfig: Readonly<ApplicationConfig> = Object.freeze({
    env: env('ENV', 'development'),
    url: env('APP_URL', 'http://localhost:3000'),
    serverUrl: env('APP_SERVER_URL', 'http://localhost:5000'),
    port: env('PORT', 5000),
    key: env('SECRET', 'this-is-not-a-secret'),
    basePath: path.join(__dirname, '..')
})
