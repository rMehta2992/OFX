// src/schemas/getPaymentSchema.ts

import * as Joi from 'joi';

export const GetPaymentSchema = Joi.object({
  pathParameters: Joi.object({
    id: Joi.string()
      .guid({ version: ['uuidv4'] })
      .required()
      .messages({
        'any.required': 'Payment ID is required',
        'string.guid':   'Payment ID must be a valid UUID'
      }),
  }).required(),
}).required();

export type GetPaymentInput = {
  pathParameters: { id: string };
};
