import * as Joi from 'joi';
import { ListPaymentsSchema } from '../../src/schemas/listPaymentsSchema';

describe('ListPaymentsSchema', () => {
  it('accepts no queryStringParameters', () => {
    const { error, value } = ListPaymentsSchema.validate({}, { abortEarly: false });
    expect(error).toBeUndefined();
    expect(value.queryStringParameters).toEqual({});
  });

  it('accepts a valid currency filter', () => {
    const input = { queryStringParameters: { currency: 'EUR' } };
    const { error, value } = ListPaymentsSchema.validate(input);
    expect(error).toBeUndefined();
    expect(value.queryStringParameters.currency).toBe('EUR');
  });

  it('rejects invalid currency filter', () => {
    const input = { queryStringParameters: { currency: 'EURO' } };
    const { error } = ListPaymentsSchema.validate(input, { abortEarly: false });
    expect(error).toBeDefined();
    const msg = error!.details.find(d => d.path.join('.') === 'queryStringParameters.currency')?.message;
    expect(msg).toMatch("Currency filter must be a 3-letter code");
  });
});