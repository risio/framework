export interface Command {

    name: string
    run(args: any): Promise<void>

}
