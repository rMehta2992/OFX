import * as Joi from 'joi';

export const getPaymentSchema = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).insensitive().required(),
});
