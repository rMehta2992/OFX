// src/schemas/listPaymentsSchema.ts

import * as Joi from 'joi';

/**
 * Joi schema for validating the query parameters of listPayments handler
 */
export const ListPaymentsSchema = Joi.object({
  queryStringParameters: Joi.object({
    currency: Joi.string()
      .length(3)
      .uppercase()
      .trim()
      .optional()
      .messages({
        'string.length':   'Currency filter must be a 3-letter code',
        'string.base':     'Currency filter must be text',
      }),
  })
    // Allow omitting the entire queryStringParameters object
    .default({}),
}).required();

export type ListPaymentsInput = {
  queryStringParameters: {
    currency?: string;
  };
};
