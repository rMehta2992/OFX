// test/listPayments.test.ts

import * as payments from '../src/lib/payments';
import { handler } from '../src/listPayments';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('listPayments handler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns 200 and all payments when no currency filter provided', async () => {
    const mockData = [
      { id: '1', amount: 100, currency: 'USD' },
      { id: '2', amount: 200, currency: 'EUR' }
    ];
    jest.spyOn(payments, 'listPayments').mockResolvedValueOnce(mockData);

    const event = {} as unknown as APIGatewayProxyEvent;
    const result = await handler(event);

    expect(payments.listPayments).toHaveBeenCalledWith(undefined);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({ data: mockData });
  });

  it('returns 200 and filtered payments when currency filter provided', async () => {
    const mockData = [ { id: '1', amount: 100, currency: 'USD' } ];
    jest.spyOn(payments, 'listPayments').mockResolvedValueOnce(mockData);

    const event = { queryStringParameters: { currency: 'USD' } } as unknown as APIGatewayProxyEvent;
    const result = await handler(event);

    expect(payments.listPayments).toHaveBeenCalledWith('USD');
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({ data: mockData });
  });

  it('returns 400 when invalid currency filter provided', async () => {
    // 1️⃣ Spy on listPayments so we can assert it never runs
    const spy = jest.spyOn(payments, 'listPayments');

    const event = { queryStringParameters: { currency: 'US' } } as unknown as APIGatewayProxyEvent;
    const result = await handler(event);

    const body = JSON.parse(result.body);
    expect(result.statusCode).toBe(400);
    expect(body).toHaveProperty('errors');
    expect(Array.isArray(body.errors)).toBe(true);
    expect(body.errors[0]).toHaveProperty('message');

    // 2️⃣ Ensure our service layer was never called on bad input
    expect(spy).not.toHaveBeenCalled();
  });

  it('returns 500 on unexpected exceptions', async () => {
    jest.spyOn(payments, 'listPayments').mockRejectedValueOnce(new Error('boom'));

    const event = {} as unknown as APIGatewayProxyEvent;
    const result = await handler(event);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({ error: 'Internal server error' });
  });
});
