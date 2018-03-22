import { Application, ServiceProvider } from '../foundation'

import { Logger } from '../log'
import { Manager } from './Manager'
import { Scheduler } from './Scheduler'

export class ConsoleServiceProvider extends ServiceProvider {

    public register(app: Application): void {
        app.singleton<Scheduler>('console.scheduler', app => {
            return new Scheduler(app.make<Logger>('log'))
        })

        app.singleton<Manager>('console.manager', app => {
            return new Manager()
        })
    }

}
