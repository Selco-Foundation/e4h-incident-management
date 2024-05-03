import { Resolver } from 'react-hook-form';
import * as Joi from 'joi';
export declare const joiResolver: <TFieldValues extends Record<string, any>>(schema: Joi.Schema, options?: Joi.AsyncValidationOptions) => Resolver<TFieldValues, object>;
