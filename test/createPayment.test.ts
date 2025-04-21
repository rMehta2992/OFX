import * as payments from '../src/lib/payments';
import { handler } from '../src/createPayment';
import { randomUUID } from 'crypto';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('createPayment handler', () => {
  afterEach(() => jest.resetAllMocks());

  it('returns 201 and generated ID on success', async () => {
    const fakeId = '11111111-1111-4111-8111-111111111111';
    jest.spyOn(payments, 'createPayment').mockResolvedValueOnce();
    jest.spyOn(require('crypto'), 'randomUUID').mockReturnValueOnce(fakeId);

    const event = { body: JSON.stringify({ amount: 500, currency: 'USD' }) } as unknown as APIGatewayProxyEvent;
    const res = await handler(event);

    expect(payments.createPayment).toHaveBeenCalledWith({ id: fakeId, amount: 500, currency: 'USD' });
    expect(res.statusCode).toBe(201);
    expect(JSON.parse(res.body)).toEqual({ result: fakeId });
  });

  it('ignores client-supplied id in payload', async () => {
    const fakeId = '22222222-2222-4222-8222-222222222222';
    jest.spyOn(payments, 'createPayment').mockResolvedValueOnce();
    jest.spyOn(require('crypto'), 'randomUUID').mockReturnValueOnce(fakeId);

    const event = { body: JSON.stringify({ id: 'foo', amount: 100, currency: 'EUR' }) } as unknown as APIGatewayProxyEvent;
    const res = await handler(event);

    expect(payments.createPayment).toHaveBeenCalledWith({ id: fakeId, amount: 100, currency: 'EUR' });
    expect(res.statusCode).toBe(201);
    expect(JSON.parse(res.body)).toEqual({ result: fakeId });
  });

  it('returns 422 on invalid payload', async () => {
    const event = { body: JSON.stringify({ amount: -5, currency: 'EURO' }) } as unknown as APIGatewayProxyEvent;
    const res = await handler(event);
    expect(res.statusCode).toBe(422);
    const body = JSON.parse(res.body);
    console.log(body);
    expect(Array.isArray(body.errors)).toBe(true);
    expect(body.errors[0]).toHaveProperty('message');
  });

  it('returns 500 on unexpected errors', async () => {
    jest.spyOn(payments, 'createPayment').mockRejectedValueOnce(new Error('db error'));
    const fakeId = randomUUID();
    jest.spyOn(require('crypto'), 'randomUUID').mockReturnValueOnce(fakeId);

    const event = { body: JSON.stringify({ amount: 10, currency: 'AUD' }) } as unknown as APIGatewayProxyEvent;
    const res = await handler(event);
    expect(res.statusCode).toBe(500);
    expect(JSON.parse(res.body)).toEqual({ error: 'Internal server error' });
  });
});