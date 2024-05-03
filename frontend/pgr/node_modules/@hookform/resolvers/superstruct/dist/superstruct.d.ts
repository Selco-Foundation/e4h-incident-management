import { Resolver } from 'react-hook-form';
import { validate, Struct, Infer } from 'superstruct';
declare type Options = Parameters<typeof validate>[2];
export declare const superstructResolver: <T extends Struct<any, any>>(schema: T, options?: Options) => Resolver<Infer<T>, object>;
export {};
