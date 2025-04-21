"use strict";
// src/lib/payments.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = exports.listPayments = exports.getPayment = void 0;
const dynamodb_1 = require("./dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
/**
 * Retrieve a single payment by its ID.
 */
const getPayment = async (paymentId) => {
    const result = await dynamodb_1.DocumentClient.send(new lib_dynamodb_1.GetCommand({
        TableName: 'Payments',
        Key: { paymentId },
    }));
    return result.Item || null;
};
exports.getPayment = getPayment;
/**
 * List payments, optionally filtering by currency.
 */
const listPayments = async (currency) => {
    const params = {
        TableName: 'Payments',
    };
    if (currency) {
        params.FilterExpression = 'currency = :c';
        params.ExpressionAttributeValues = { ':c': currency };
    }
    const result = await dynamodb_1.DocumentClient.send(new lib_dynamodb_1.ScanCommand(params));
    return result.Items || [];
};
exports.listPayments = listPayments;
/**
 * Create a new payment record.
 */
const createPayment = async (payment) => {
    const { id, amount, currency } = payment;
    await dynamodb_1.DocumentClient.send(new lib_dynamodb_1.PutCommand({
        TableName: 'Payments',
        Item: {
            paymentId: id,
            amount,
            currency,
        },
    }));
};
exports.createPayment = createPayment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXltZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0JBQXNCOzs7QUFFdEIseUNBQTRDO0FBQzVDLHdEQUE0RTtBQVE1RTs7R0FFRztBQUNJLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFDM0IsU0FBaUIsRUFDTSxFQUFFO0lBQ3pCLE1BQU0sTUFBTSxHQUFHLE1BQU0seUJBQWMsQ0FBQyxJQUFJLENBQ3BDLElBQUkseUJBQVUsQ0FBQztRQUNYLFNBQVMsRUFBRSxVQUFVO1FBQ3JCLEdBQUcsRUFBRSxFQUFFLFNBQVMsRUFBRTtLQUNyQixDQUFDLENBQ0wsQ0FBQztJQUNGLE9BQVEsTUFBTSxDQUFDLElBQWdCLElBQUksSUFBSSxDQUFDO0FBQzVDLENBQUMsQ0FBQztBQVZXLFFBQUEsVUFBVSxjQVVyQjtBQUVGOztHQUVHO0FBQ0ksTUFBTSxZQUFZLEdBQUcsS0FBSyxFQUM3QixRQUFpQixFQUNDLEVBQUU7SUFDcEIsTUFBTSxNQUFNLEdBQXNHO1FBQzlHLFNBQVMsRUFBRSxVQUFVO0tBQ3hCLENBQUM7SUFDRixJQUFJLFFBQVEsRUFBRTtRQUNWLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7UUFDMUMsTUFBTSxDQUFDLHlCQUF5QixHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO0tBQ3pEO0lBRUQsTUFBTSxNQUFNLEdBQUcsTUFBTSx5QkFBYyxDQUFDLElBQUksQ0FDcEMsSUFBSSwwQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUMxQixDQUFDO0lBQ0YsT0FBUSxNQUFNLENBQUMsS0FBbUIsSUFBSSxFQUFFLENBQUM7QUFDN0MsQ0FBQyxDQUFDO0FBZlcsUUFBQSxZQUFZLGdCQWV2QjtBQUVGOztHQUVHO0FBQ0ksTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUFFLE9BQWdCLEVBQWlCLEVBQUU7SUFDbkUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBQ3pDLE1BQU0seUJBQWMsQ0FBQyxJQUFJLENBQ3JCLElBQUkseUJBQVUsQ0FBQztRQUNYLFNBQVMsRUFBRSxVQUFVO1FBQ3JCLElBQUksRUFBRTtZQUNGLFNBQVMsRUFBRSxFQUFFO1lBQ2IsTUFBTTtZQUNOLFFBQVE7U0FDWDtLQUNKLENBQUMsQ0FDTCxDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBWlcsUUFBQSxhQUFhLGlCQVl4QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9saWIvcGF5bWVudHMudHNcblxuaW1wb3J0IHsgRG9jdW1lbnRDbGllbnQgfSBmcm9tICcuL2R5bmFtb2RiJztcbmltcG9ydCB7IEdldENvbW1hbmQsIFB1dENvbW1hbmQsIFNjYW5Db21tYW5kIH0gZnJvbSAnQGF3cy1zZGsvbGliLWR5bmFtb2RiJztcblxuZXhwb3J0IHR5cGUgUGF5bWVudCA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGFtb3VudDogbnVtYmVyO1xuICAgIGN1cnJlbmN5OiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlIGEgc2luZ2xlIHBheW1lbnQgYnkgaXRzIElELlxuICovXG5leHBvcnQgY29uc3QgZ2V0UGF5bWVudCA9IGFzeW5jIChcbiAgICBwYXltZW50SWQ6IHN0cmluZ1xuKTogUHJvbWlzZTxQYXltZW50IHwgbnVsbD4gPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IERvY3VtZW50Q2xpZW50LnNlbmQoXG4gICAgICAgIG5ldyBHZXRDb21tYW5kKHtcbiAgICAgICAgICAgIFRhYmxlTmFtZTogJ1BheW1lbnRzJyxcbiAgICAgICAgICAgIEtleTogeyBwYXltZW50SWQgfSxcbiAgICAgICAgfSlcbiAgICApO1xuICAgIHJldHVybiAocmVzdWx0Lkl0ZW0gYXMgUGF5bWVudCkgfHwgbnVsbDtcbn07XG5cbi8qKlxuICogTGlzdCBwYXltZW50cywgb3B0aW9uYWxseSBmaWx0ZXJpbmcgYnkgY3VycmVuY3kuXG4gKi9cbmV4cG9ydCBjb25zdCBsaXN0UGF5bWVudHMgPSBhc3luYyAoXG4gICAgY3VycmVuY3k/OiBzdHJpbmdcbik6IFByb21pc2U8UGF5bWVudFtdPiA9PiB7XG4gICAgY29uc3QgcGFyYW1zOiB7IFRhYmxlTmFtZTogc3RyaW5nOyBGaWx0ZXJFeHByZXNzaW9uPzogc3RyaW5nOyBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzPzogUmVjb3JkPHN0cmluZywgYW55PiB9ID0ge1xuICAgICAgICBUYWJsZU5hbWU6ICdQYXltZW50cycsXG4gICAgfTtcbiAgICBpZiAoY3VycmVuY3kpIHtcbiAgICAgICAgcGFyYW1zLkZpbHRlckV4cHJlc3Npb24gPSAnY3VycmVuY3kgPSA6Yyc7XG4gICAgICAgIHBhcmFtcy5FeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzID0geyAnOmMnOiBjdXJyZW5jeSB9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IERvY3VtZW50Q2xpZW50LnNlbmQoXG4gICAgICAgIG5ldyBTY2FuQ29tbWFuZChwYXJhbXMpXG4gICAgKTtcbiAgICByZXR1cm4gKHJlc3VsdC5JdGVtcyBhcyBQYXltZW50W10pIHx8IFtdO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgcGF5bWVudCByZWNvcmQuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVQYXltZW50ID0gYXN5bmMgKHBheW1lbnQ6IFBheW1lbnQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IGlkLCBhbW91bnQsIGN1cnJlbmN5IH0gPSBwYXltZW50O1xuICAgIGF3YWl0IERvY3VtZW50Q2xpZW50LnNlbmQoXG4gICAgICAgIG5ldyBQdXRDb21tYW5kKHtcbiAgICAgICAgICAgIFRhYmxlTmFtZTogJ1BheW1lbnRzJyxcbiAgICAgICAgICAgIEl0ZW06IHtcbiAgICAgICAgICAgICAgICBwYXltZW50SWQ6IGlkLFxuICAgICAgICAgICAgICAgIGFtb3VudCxcbiAgICAgICAgICAgICAgICBjdXJyZW5jeSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgKTtcbn07XG4iXX0=