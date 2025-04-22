import * as Joi from 'joi';

export const createPaymentSchema = Joi.object({
  id: Joi.forbidden(),
  amount: Joi.number().positive().required().strict(),
  currency: Joi.string().length(3).uppercase().required().strict(),
});
