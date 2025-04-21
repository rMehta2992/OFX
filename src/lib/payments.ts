// src/lib/payments.ts

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
export const getPayment = async (
    paymentId: string
): Promise<Payment | null> => {
    const result = await DocumentClient.send(
        new GetCommand({
            TableName: 'Payments',
            Key: { paymentId },
        })
    );
    return (result.Item as Payment) || null;
};

/**
 * List payments, optionally filtering by currency.
 */
export const listPayments = async (
    currency?: string
): Promise<Payment[]> => {
    const params: { TableName: string; FilterExpression?: string; ExpressionAttributeValues?: Record<string, any> } = {
        TableName: 'Payments',
    };
    if (currency) {
        params.FilterExpression = 'currency = :c';
        params.ExpressionAttributeValues = { ':c': currency };
    }

    const result = await DocumentClient.send(
        new ScanCommand(params)
    );
    return (result.Items as Payment[]) || [];
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
