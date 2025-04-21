// src/listPayments.ts

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { listPayments } from './lib/payments';
import { buildResponse } from './lib/apigateway';
import { StatusCodes } from 'http-status-codes';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // 1. Read optional currency filter
    const currency = event.queryStringParameters?.currency;

    // 2. If provided and invalid (not exactly 3 uppercase letters), return 400
    if (currency && !/^[A-Z]{3}$/.test(currency)) {
      return buildResponse(StatusCodes.BAD_REQUEST, {
        errors: [{ message: 'Invalid currency filter' }],
      });
    }

    // 3. Fetch payments (filtered or not)
    const paymentsData = await listPayments(currency);

    // 4. Return successful response
    return buildResponse(StatusCodes.OK, { data: paymentsData });
  } catch (error) {
    console.error('listPayments handler error:', error);
    return buildResponse(StatusCodes.INTERNAL_SERVER_ERROR, { error: 'Internal server error' });
  }
};
