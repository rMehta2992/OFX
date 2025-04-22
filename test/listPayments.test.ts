import { handler as listHandler } from '../src/listPayments';
import { StatusCodes } from 'http-status-codes';
import { APIGatewayProxyEvent } from 'aws-lambda';
import * as payments from '../src/lib/payments';

describe('List Payments Handler', () => {
  afterEach(() => jest.resetAllMocks());

  it('returns 200 with all payments when no filter is applied', async () => {
    const mockData = [
      { id: '1', amount: 100, currency: 'USD' },
      { id: '2', amount: 200, currency: 'EUR' },
    ];
    jest.spyOn(payments, 'listPayments').mockResolvedValueOnce(mockData);

    const event = {} as unknown as APIGatewayProxyEvent;
    const result = await listHandler(event);

    expect(result.statusCode).toBe(StatusCodes.OK);
    expect(JSON.parse(result.body)).toEqual({ data: mockData });
  });

  it('returns 200 with filtered results when valid currency is passed', async () => {
    const mockData = [{ id: '3', amount: 150, currency: 'USD' }];
    jest.spyOn(payments, 'listPayments').mockResolvedValueOnce(mockData);

    const event = {
      queryStringParameters: { currency: 'USD' },
    } as unknown as APIGatewayProxyEvent;

    const result = await listHandler(event);

    expect(result.statusCode).toBe(StatusCodes.OK);
    expect(JSON.parse(result.body)).toEqual({ data: mockData });
  });

  it('returns 400 for invalid currency code', async () => {
    const spy = jest.spyOn(payments, 'listPayments');
    const event = {
      queryStringParameters: { currency: 'US' },
    } as unknown as APIGatewayProxyEvent;

    const result = await listHandler(event);
    expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(JSON.parse(result.body)).toHaveProperty('errors');
    expect(spy).not.toHaveBeenCalled();
  });

  it('returns 500 on internal error', async () => {
    jest.spyOn(payments, 'listPayments').mockRejectedValueOnce(new Error('Service failure'));

    const event = {} as unknown as APIGatewayProxyEvent;
    const result = await listHandler(event);

    expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });
  it('returns 400 for empty currency value', async () => {
    const event = { queryStringParameters: { currency: '' } } as any;
    const result = await listHandler(event);
    expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it('returns 400 for numeric currency input', async () => {
    const event = { queryStringParameters: { currency: 123 as any } } as any;
    const result = await listHandler(event);
    expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it('returns 400 for currency longer than 3 letters', async () => {
    const event = { queryStringParameters: { currency: 'USDA' } } as any;
    const result = await listHandler(event);
    expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it('returns 400 for extra unexpected query param', async () => {
    const event = {
      queryStringParameters: { currency: 'USD', extra: 'ignore' },
    } as any;

    const result = await listHandler(event);
    expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(JSON.parse(result.body)).toHaveProperty('errors');
  });
});
