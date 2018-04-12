import { Filesystem } from '@risio/foundation'

import { applicationConfig } from '../config/application'
import { filesystemConfig } from '../config/filesystem'
import { logConfig } from '../config/log'

import { app as application } from './app'

// import { Manager, Scheduler } from '../console'
// import { Cache } from '../cache'

(async () => {
    console.log('Application starting')

    process.on('uncaughtException', (uncaughtException: Error) => {
        console.error(`You have an uncaught exception in your code:\n${uncaughtException.stack}`)
    })

    process.on('unhandledRejection', (unhandledRejection: Error) => {
        console.error(`You have an unhandled rejection in your code:\n${unhandledRejection.stack}`)
    })

    const app = application(applicationConfig)

    const log = (adapter?: string) => app.ioc.getNamed<Logger>(Symbol.for('Risio:Logger'), adapter ? adapter : logConfig.adapter)
    const filesystem = (adapter?: string) => app.ioc.getNamed<Filesystem>(Symbol.for('Risio:Filesystem'), adapter ? adapter : filesystemConfig.adapter)
    // const mailer = (adapter?: string) => app.ioc.getNamed<Mailer>(Symbol.for('Risio:Mailer'), adapter ? adapter : mailConfig.adapter)

    // const cache = (driver?: string) => app.make<Cache>(`cache.${driver ? driver : app.config.cache.driver}`)

    // const commandManager = () => app.make<Manager>('console.manager')
    // const commandScheduler = () => app.make<Scheduler>('console.scheduler')

    log().debug('debug')
    log().info('info')
    log().warn('warn')

    // await mailer().send({
    //     to: 'bryan@lifely.nl',
    //     subject: 'Awesome',
    //     html: 'test content'
    // })

    await filesystem().write('test.txt', 'foo')
    await filesystem().read('test.txt')

    console.log('Application loaded')
})()
