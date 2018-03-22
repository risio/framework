export interface CacheAdapter {

    get(key: string): Promise<string>
    set(key: string, value: string): Promise<void>
    forget(key: string): Promise<void>
    flush(): Promise<void>
    remember(key: string, seconds: number, data: () => Promise<string>): Promise<string>

}
