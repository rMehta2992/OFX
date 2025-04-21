import * as Joi from 'joi';
import { GetPaymentSchema } from '../../src/schemas/getPaymentSchema';

describe('GetPaymentSchema', () => {
  it('accepts a valid pathParameters object', () => {
    const input = { pathParameters: { id: '550e8400-e29b-41d4-a716-446655440000' } };
    const { error, value } = GetPaymentSchema.validate(input, { abortEarly: false });
    expect(error).toBeUndefined();
    expect(value).toEqual(input);
  });

  it('rejects missing pathParameters', () => {
    const { error } = GetPaymentSchema.validate({}, { abortEarly: false });
    expect(error).toBeDefined();
    const messages = error!.details.map(d => d.message);
    expect(messages).toEqual(
      expect.arrayContaining([
        '"pathParameters" is required'
      ])
    );
  });

  it('rejects invalid UUID', () => {
    const input = { pathParameters: { id: 'not-a-uuid' } };
    const { error } = GetPaymentSchema.validate(input, { abortEarly: false });
    expect(error).toBeDefined();
    const msg = error!.details.find(d => d.path.join('.') === 'pathParameters.id')?.message;
    expect(msg).toMatch(/must be a valid UUID/);
  });
});