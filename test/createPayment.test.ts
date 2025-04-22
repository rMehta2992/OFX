import { handler as createHandler } from '../src/createPayment';
import { StatusCodes } from 'http-status-codes';
import { APIGatewayProxyEvent } from 'aws-lambda';
import * as payments from '../src/lib/payments';
import { randomUUID } from 'crypto';

describe('Create Payment Handler', () => {
  afterEach(() => jest.resetAllMocks());

  // Valid creation scenario
  it('returns 201 and generated ID on success', async () => {
    const fakeId = randomUUID();
    jest.spyOn(payments, 'createPayment').mockResolvedValueOnce();
    jest.spyOn(require('crypto'), 'randomUUID').mockReturnValueOnce(fakeId);

    const event = {
      body: JSON.stringify({ amount: 500, currency: 'USD' }),
    } as APIGatewayProxyEvent;
    const res = await createHandler(event);

    expect(res.statusCode).toBe(StatusCodes.CREATED);
    expect(JSON.parse(res.body)).toEqual({ result: fakeId });
  });

  // Joi validation tests
  it('returns 400 for invalid amount', async () => {
    const event = {
      body: JSON.stringify({ amount: -10, currency: 'USD' }),
    } as APIGatewayProxyEvent;
    const res = await createHandler(event);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it('returns 400 for invalid currency', async () => {
    const event = {
      body: JSON.stringify({ amount: 100, currency: 'usd1' }),
    } as APIGatewayProxyEvent;
    const res = await createHandler(event);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it('returns 400 for amount 0 (not positive)', async () => {
    const event = { body: JSON.stringify({ amount: 0, currency: 'USD' }) } as APIGatewayProxyEvent;
    const res = await createHandler(event);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it('returns 400 for amount as a string', async () => {
    const event = {
      body: JSON.stringify({ amount: '100', currency: 'USD' }),
    } as APIGatewayProxyEvent;
    const res = await createHandler(event);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it('returns 400 for lowercase currency code', async () => {
    const event = {
      body: JSON.stringify({ amount: 100, currency: 'usd' }),
    } as APIGatewayProxyEvent;
    const res = await createHandler(event);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it('returns 400 for empty currency string', async () => {
    const event = { body: JSON.stringify({ amount: 100, currency: '' }) } as APIGatewayProxyEvent;
    const res = await createHandler(event);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it('returns 400 for missing amount', async () => {
    const event = { body: JSON.stringify({ currency: 'USD' }) } as APIGatewayProxyEvent;
    const res = await createHandler(event);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it('returns 400 for missing currency', async () => {
    const event = { body: JSON.stringify({ amount: 100 }) } as APIGatewayProxyEvent;
    const res = await createHandler(event);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it('returns 400 for completely empty payload', async () => {
    const event = { body: JSON.stringify({}) } as APIGatewayProxyEvent;
    const res = await createHandler(event);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
  // Simulate internal error
  it('returns 500 on internal error', async () => {
    jest.spyOn(payments, 'createPayment').mockRejectedValueOnce(new Error('internal error'));
    jest
      .spyOn(require('crypto'), 'randomUUID')
      .mockReturnValueOnce('33333333-3333-4333-8333-333333333333');

    const event = { body: JSON.stringify({ amount: 50, currency: 'AUD' }) } as APIGatewayProxyEvent;
    const res = await createHandler(event);
    expect(res.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('returns 400 for unknown fields in payload if not allowed', async () => {
    const event = {
      body: JSON.stringify({ amount: 100, currency: 'USD', note: 'test' }),
    } as APIGatewayProxyEvent;
    const res = await createHandler(event);
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
});
