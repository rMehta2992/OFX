import * as Joi from 'joi';
/**
 * Joi schema for validating the query parameters of listPayments handler
 */
export declare const ListPaymentsSchema: Joi.ObjectSchema<any>;
export type ListPaymentsInput = {
    queryStringParameters: {
        currency?: string;
    };
};
