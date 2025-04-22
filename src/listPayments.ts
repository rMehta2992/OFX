// src/listPayments.ts

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { listPayments } from './lib/payments';
import { buildResponse } from './lib/apigateway';
import { StatusCodes } from 'http-status-codes';
import { listPaymentsSchema } from './schemas/listPaymentsSchema';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    // 1. Read optional currency filter and params
    const currency = event.queryStringParameters?.currency;
    const params = event.queryStringParameters || {};

    // 2. Validate schema
    const { error, value } = listPaymentsSchema.validate(params);
    if (error) {
      return buildResponse(StatusCodes.BAD_REQUEST, { errors: error.details });
    }

    // 3. Fetch payments (filtered or not)
    const paymentsData = await listPayments(currency);

    // 4. Return successful response
    return buildResponse(StatusCodes.OK, { data: paymentsData });
  } catch (err: any) {
    console.error('Handler error:', err);
    return buildResponse(StatusCodes.INTERNAL_SERVER_ERROR, {
      message: err.message || 'An unexpected error occurred',
      //stack trace can be added for multiple env
    });
  }
};
