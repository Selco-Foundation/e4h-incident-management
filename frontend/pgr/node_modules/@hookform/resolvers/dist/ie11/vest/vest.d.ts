import { Resolver } from 'react-hook-form';
import * as Vest from 'vest';
declare type ICreateResult = ReturnType<typeof Vest.create>;
export declare const vestResolver: <TFieldValues extends Record<string, any>>(schema: ICreateResult, _?: any, validateAllFieldCriteria?: boolean) => Resolver<TFieldValues, object>;
export {};
