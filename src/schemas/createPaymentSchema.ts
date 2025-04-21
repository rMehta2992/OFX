// src/schemas/paymentSchema.ts

import * as Joi from 'joi';  // Use namespace import to satisfy TS without esModuleInterop

/**
 * Joi schema for validating payment creation payloads
 */
export const PaymentSchema = Joi.object({
  amount: Joi.number().min(0).required(),
  currency: Joi.string().length(3).uppercase().trim().required(),
  description: Joi.string().trim().optional(),
}).required();

/**
 * Type representing a valid, parsed payment input
 */
export interface PaymentInput {
  amount: number;
  currency: string;
  description?: string;
}
