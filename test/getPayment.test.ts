import { handler as getHandler } from '../src/getPayment';
import { StatusCodes } from 'http-status-codes';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { randomUUID } from 'crypto';

jest.mock('../src/lib/payments', () => ({
  getPayment: jest.fn(),
}));

const { getPayment } = require('../src/lib/payments');

const createEvent = (id?: string): APIGatewayProxyEvent => ({
  body: null,
  headers: {},
  multiValueHeaders: {},
  httpMethod: 'GET',
  isBase64Encoded: false,
  path: '/',
  pathParameters: id ? { id } : null,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  resource: '/',
  requestContext: {} as any,
});

describe('Get Payment Handler', () => {
  afterEach(() => jest.resetAllMocks());

  it('returns 400 for malformed UUID', async () => {
    const res = await getHandler(createEvent('not-a-uuid'));
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it('returns 400 when ID is not provided', async () => {
    const res = await getHandler(createEvent(undefined));
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it('returns 200 and payment when valid ID is provided', async () => {
    const id = randomUUID();
    getPayment.mockResolvedValueOnce({ id: 'abc', amount: 500, currency: 'USD' });
    const res = await getHandler(createEvent(id));
    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(JSON.parse(res.body)).toEqual({ id: 'abc', amount: 500, currency: 'USD' });
  });

  it('returns 404 when no matching payment is found', async () => {
    getPayment.mockResolvedValueOnce(null);
    const id = randomUUID();
    const res = await getHandler(createEvent(id));
    expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
  });

  it('returns 500 on unexpected error', async () => {
    getPayment.mockRejectedValueOnce(new Error('Unexpected error'));
    const id = randomUUID();
    const res = await getHandler(createEvent(id));
    expect(res.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
