import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { buildResponse } from './lib/apigateway';
import { getPayment } from './lib/payments';
import { getPaymentSchema } from './schemas/getPaymentSchema';
import { StatusCodes } from 'http-status-codes';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    // 1) Parse the params and validate
    const id = event.pathParameters?.id;
    if (!id) {
      return buildResponse(StatusCodes.BAD_REQUEST, { message: 'Missing path parameter: id' });
    }

    const { error } = getPaymentSchema.validate({ id });
    if (error) {
      return buildResponse(StatusCodes.BAD_REQUEST, { errors: error.details });
    }

    // 2) Passed validation - fetch payment details
    const payment = await getPayment(id);
    if (!payment) {
      return buildResponse(StatusCodes.NOT_FOUND, { message: 'Payment not found' });
    }

    // 3: Return 200 and payment record by id
    return buildResponse(StatusCodes.OK, payment);
  } catch (err: any) {
    console.error('Handler error:', err);
    return buildResponse(StatusCodes.INTERNAL_SERVER_ERROR, {
      message: err.message || 'An unexpected error occurred',
      //stack trace can be added for multiple env
    });
  }
};
