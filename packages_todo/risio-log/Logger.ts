export interface Logger {

    debug(message: string, meta?: object): void
    info(message: string, meta?: object): void
    warn(message: string, meta?: object): void
    error(message: string, meta?: object): void

}
