export declare class RedisService {
    private memoryCache;
    set(key: string, value: any, expireTime?: number): Promise<void>;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<number>;
    getClient(): any;
}
