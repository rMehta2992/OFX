// src/createPayment.ts

import { randomUUID } from 'crypto';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { buildResponse, parseInput } from './lib/apigateway';
import { createPaymentSchema } from './schemas/createPaymentSchema';
import { createPayment as persistPayment, Payment } from './lib/payments';
import { StatusCodes } from 'http-status-codes';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    // 1) Parse the incoming JSON
    const input = parseInput(event.body || '{}') as any;
    const amount = input.amount;
    const currency = input.currency;

    // 2) Schema validation
    const { error } = createPaymentSchema.validate(input);
    if (error) {
      return buildResponse(StatusCodes.BAD_REQUEST, { errors: error.details });
    }

    // 3) Passed validation – generate ID and persist
    const id = randomUUID();
    const payment: Payment = { id, amount, currency };
    await persistPayment(payment);

    // 4) Return 201 and the generated ID
    return buildResponse(StatusCodes.CREATED, { result: id });
  } catch (err: any) {
    console.error('Handler error:', err);
    return buildResponse(StatusCodes.INTERNAL_SERVER_ERROR, {
      message: err.message || 'An unexpected error occurred',
      //stack trace can be added for multiple env
    });
  }
};
