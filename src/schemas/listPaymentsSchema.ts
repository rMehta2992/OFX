import * as Joi from 'joi';

export const listPaymentsSchema = Joi.object({
  currency: Joi.string().length(3).uppercase(),
});
