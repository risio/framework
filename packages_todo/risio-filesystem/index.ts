export const IOC = {
    Filesystem: Symbol.for('Risio:Filesystem')
}

export * from './FilesystemConfig'
export { Filesystem } from './Filesystem'
export { FilesystemServiceProvider } from './FilesystemServiceProvider'
