import { Resolver } from 'react-hook-form';
import * as z from 'zod';
import { ParseParams } from 'zod/lib/src/parser';
export declare const zodResolver: <T extends z.ZodType<any, any>>(schema: T, options?: ParseParams | undefined) => Resolver<z.TypeOf<T>, object>;
