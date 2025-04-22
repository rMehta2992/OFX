import { DocumentClient } from './dynamodb';
import { GetCommand, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

export type Payment = {
  id: string;
  amount: number;
  currency: string;
};

/**
 * Retrieve a single payment by its ID.
 */
export const getPayment = async (paymentId: string): Promise<Payment | null> => {
  const result = await DocumentClient.send(
    new GetCommand({
      TableName: 'Payments',
      Key: { paymentId },
    })
  );

  if (!result.Item) {
    return null;
  }

  return {
    id: result.Item.paymentId,
    amount: result.Item.amount,
    currency: result.Item.currency,
  };
};

/**
 * List payments, optionally filtering by currency, using strong consistency.
 */
export const listPayments = async (currency?: string): Promise<Payment[]> => {
  const params: any = {
    TableName: 'Payments',
    ConsistentRead: true,
  };
  if (currency) {
    params.FilterExpression = 'currency = :c';
    params.ExpressionAttributeValues = { ':c': currency };
  }
  const result = await DocumentClient.send(new ScanCommand(params));
  const items = (result.Items as any[]) || [];
  // Map DynamoDB items to Payment shape
  return items.map((item) => ({
    id: item.paymentId,
    amount: item.amount,
    currency: item.currency,
  }));
};

/**
 * Create a new payment record.
 */
export const createPayment = async (payment: Payment): Promise<void> => {
  const { id, amount, currency } = payment;
  await DocumentClient.send(
    new PutCommand({
      TableName: 'Payments',
      Item: {
        paymentId: id,
        amount,
        currency,
      },
    })
  );
};
