// src/createPayment.ts

import { randomUUID } from 'crypto';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { buildResponse, parseInput } from './lib/apigateway';
import { createPayment as persistPayment, Payment } from './lib/payments';
import { StatusCodes } from 'http-status-codes';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // 1) Parse the incoming JSON
    const input = parseInput(event.body || '{}') as any;
    const amount = input.amount;
    const currency = input.currency;

    // 2) Validate, collecting errors in an array
    const errors: { message: string }[] = [];
    if (typeof amount !== 'number' || amount < 0) {
      errors.push({ message: 'Invalid payment payload' });
    }
    if (typeof currency !== 'string' || !/^[A-Z]{3}$/.test(currency)) {
      errors.push({ message: 'Invalid payment payload' });
    }
    if (errors.length) {
      return buildResponse(StatusCodes.UNPROCESSABLE_ENTITY, { errors });
    }

    // 3) Passed validation – generate ID and persist
    const id = randomUUID();
    const payment: Payment = { id, amount, currency };
    await persistPayment(payment);

    // 4) Return 201 and the generated ID
    return buildResponse(StatusCodes.CREATED, { result: id });
  } catch (error) {
    console.error('createPayment handler error:', error, 'Event:', event);
    return buildResponse(StatusCodes.INTERNAL_SERVER_ERROR, { error: 'Internal server error' });
  }
};
