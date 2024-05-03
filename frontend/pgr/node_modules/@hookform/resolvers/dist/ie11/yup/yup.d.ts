import { Resolver } from 'react-hook-form';
import Yup from 'yup';
import Lazy from 'yup/lib/Lazy';
declare type ValidateOptions<T extends Yup.AnyObjectSchema> = Parameters<T['validate']>[1];
export declare const yupResolver: <TFieldValues extends Record<string, any>>(schema: Yup.AnyObjectSchema | Lazy<any, any>, options?: ValidateOptions<Yup.AnyObjectSchema>) => Resolver<TFieldValues, object>;
export {};
