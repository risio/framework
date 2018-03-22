import * as schedule from 'node-schedule'

import { Logger } from '../log'
import { Command } from './Command'

interface Timetable {
    second?: number
    minute?: number
    hour?: number
    date?: number
    month?: number
    year?: number
    dayOfWeek?: number
}

export interface ScheduledCommand {
    schedule: Timetable | string,
    command: Command,
    args: any[]
}

export class Scheduler {

    private scheduledCommands: ScheduledCommand[]

    constructor(
        private logger: Logger
    ) {}

    /**
     * Adds a new command to run on a schedule.
     *
     * Cron format.
     *  *    *    *    *    *    *
     *  ┬    ┬    ┬    ┬    ┬    ┬
     *  │    │    │    │    │    |
     *  │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
     *  │    │    │    │    └───── month (1 - 12)
     *  │    │    │    └────────── day of month (1 - 31)
     *  │    │    └─────────────── hour (0 - 23)
     *  │    └──────────────────── minute (0 - 59)
     *  └───────────────────────── second (0 - 59, OPTIONAL)
     */
    public schedule(schedule: Timetable | string, command: Command, args: any[]) {
        this.scheduledCommands.push({ schedule, command, args })
    }

    /**
     * Start the scheduler, will run all schedules commands at their given cron interval
     */
    public start = () => {
        this.logger.debug('Starting scheduler...')

        this.scheduledCommands.forEach(scheduledCommand => {
            schedule.scheduleJob(scheduledCommand.schedule, async () => {
                this.logger.info(`Running command: ${scheduledCommand.command.name}`)

                try {
                    await scheduledCommand.command.run(scheduledCommand.args)
                } catch (error) {
                    this.logger.error(`Failed to run command: ${scheduledCommand.command.name}. Reason: ${error.stack}`)
                }
            })
        })
    }

}
