// src/getPayment.ts

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getPayment as fetchPayment } from './lib/payments';
import { buildResponse } from './lib/apigateway';
import { StatusCodes } from 'http-status-codes';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const paymentId = event.pathParameters?.id;
    if (!paymentId) {
      return buildResponse(StatusCodes.BAD_REQUEST, { error: 'Missing payment ID parameter' });
    }

    const payment = await fetchPayment(paymentId);
    if (!payment) {
      return buildResponse(StatusCodes.NOT_FOUND, { error: 'Payment not found' });
    }

    return buildResponse(StatusCodes.OK, payment);
  } catch (err) {
    console.error('getPayment handler error:', err);
    return buildResponse(StatusCodes.INTERNAL_SERVER_ERROR, { error: 'Internal server error' });
  }
};
