/// <reference types="node" />
import { Readable } from 'stream';
export interface Filesystem {
    read(filePath: string): Promise<Readable>;
    write(filePath: string, readStream: any): Promise<void>;
    append(filePath: string, readStream: any): Promise<void>;
    isFile(filePath: string): Promise<boolean>;
    isDirectory(filePath: string): Promise<boolean>;
    exists(filePath: string): Promise<boolean>;
    delete(filePath: string): Promise<void>;
    deleteDirectory(filePath: string): Promise<void>;
    url(filePath: string): Promise<string>;
    mime(filePath: string): Promise<string>;
    extension(filePath: string): Promise<string>;
}
