// test/getPayment.test.ts

import * as payments from '../src/lib/payments';
import { handler } from '../src/getPayment';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('getPayment handler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns 200 and the payment when found', async () => {
    const paymentId = '550e8400-e29b-41d4-a716-446655440000';
    const mockPayment = { id: paymentId, currency: 'AUD', amount: 2000 };
    const getSpy = jest
      .spyOn(payments, 'getPayment')
      .mockResolvedValueOnce(mockPayment);

    const event = {
      pathParameters: { id: paymentId },
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event);

    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith(paymentId);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual(mockPayment);
  });

  it('returns 400 when pathParameters or id is missing', async () => {
    const event1 = {} as unknown as APIGatewayProxyEvent;
    const res1 = await handler(event1);
    expect(res1.statusCode).toBe(400);
    expect(JSON.parse(res1.body)).toEqual({ error: 'Missing payment ID parameter' });

    const event2 = { pathParameters: {} } as unknown as APIGatewayProxyEvent;
    const res2 = await handler(event2);
    expect(res2.statusCode).toBe(400);
    expect(JSON.parse(res2.body)).toEqual({ error: 'Missing payment ID parameter' });
  });

  it('returns 404 when payment is not found', async () => {
    const paymentId = 'nonexistent-id';
    const getSpy = jest
      .spyOn(payments, 'getPayment')
      .mockResolvedValueOnce(null);

    const event = {
      pathParameters: { id: paymentId },
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event);

    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith(paymentId);
    expect(result.statusCode).toBe(404);
    expect(JSON.parse(result.body)).toEqual({ error: 'Payment not found' });
  });

  it('returns 500 on unexpected exceptions', async () => {
    const paymentId = '550e8400-e29b-41d4-a716-446655440000';
    jest
      .spyOn(payments, 'getPayment')
      .mockRejectedValueOnce(new Error('boom'));

    const event = {
      pathParameters: { id: paymentId },
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({ error: 'Internal server error' });
  });

  it('handles edge-case IDs correctly', async () => {
    const edgeId = "ID_WITH_SPECIAL-._~!*'();:@&=+$,/?#[]";
    const mockPayment = { id: edgeId, currency: 'EUR', amount: 0 };
    const getSpy = jest
      .spyOn(payments, 'getPayment')
      .mockResolvedValueOnce(mockPayment);

    const event = {
      pathParameters: { id: edgeId },
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event);

    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith(edgeId);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual(mockPayment);
  });
});
