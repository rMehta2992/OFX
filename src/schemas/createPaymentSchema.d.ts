import * as Joi from 'joi';
/**
 * Joi schema for validating payment creation payloads
 */
export declare const PaymentSchema: Joi.ObjectSchema<any>;
/**
 * Type representing a valid, parsed payment input
 */
export interface PaymentInput {
    amount: number;
    currency: string;
    description?: string;
}
