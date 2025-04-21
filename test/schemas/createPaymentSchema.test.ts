import * as Joi from 'joi';
import { PaymentSchema } from '../../src/schemas/createPaymentSchema';

describe('PaymentSchema', () => {
  it('accepts valid payload', () => {
    const payload = { amount: 123.45, currency: 'USD', description: 'Test' };
    const { error, value } = PaymentSchema.validate(payload, { abortEarly: false });
    expect(error).toBeUndefined();
    expect(value).toEqual(payload);
  });

  it('rejects negative amount and bad currency', () => {
    const payload = { amount: -1, currency: 'us', description: '' };
    const { error } = PaymentSchema.validate(payload, { abortEarly: false });
    expect(error).toBeDefined();
    const messages = error!.details.map(d => d.message);
    expect(messages).toEqual(
      expect.arrayContaining([
        '"amount" must be greater than or equal to 0',
        '"currency" length must be 3 characters long',
        '"description" is not allowed to be empty'
      ])
    );
  });

  it('rejects missing required fields', () => {
    const payload = {};
    const { error } = PaymentSchema.validate(payload, { abortEarly: false });
    expect(error).toBeDefined();
    const paths = error!.details.map(d => d.path.join('.'));
    expect(paths).toEqual(expect.arrayContaining(['amount', 'currency']));
  });
});
