import { Command } from './Command'

export class Manager {

    private commands: Command[] = []

    public register(command: Command) {
        this.commands.push(command)
    }

    public async run(command: Command, args: {}) {
        await command.run(args)
    }

    public findCommandByName(name) {
        return this.commands.find(command => command.name === name)
    }

}
