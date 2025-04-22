export type Payment = {
  id: string;
  amount: number;
  currency: string;
};
/**
 * Retrieve a single payment by its ID.
 */
export declare const getPayment: (paymentId: string) => Promise<Payment | null>;
/**
 * List payments, optionally filtering by currency, using strong consistency.
 */
export declare const listPayments: (currency?: string) => Promise<Payment[]>;
/**
 * Create a new payment record.
 */
export declare const createPayment: (payment: Payment) => Promise<void>;
