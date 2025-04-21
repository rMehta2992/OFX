"use strict";
// src/createPayment.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const crypto_1 = require("crypto");
const apigateway_1 = require("./lib/apigateway");
const payments_1 = require("./lib/payments");
const http_status_codes_1 = require("http-status-codes");
const handler = async (event) => {
    try {
        // 1) Parse the incoming JSON
        const input = (0, apigateway_1.parseInput)(event.body || '{}');
        const amount = input.amount;
        const currency = input.currency;
        // 2) Validate, collecting errors in an array
        const errors = [];
        if (typeof amount !== 'number' || amount < 0) {
            errors.push({ message: 'Invalid payment payload' });
        }
        if (typeof currency !== 'string' || !/^[A-Z]{3}$/.test(currency)) {
            errors.push({ message: 'Invalid payment payload' });
        }
        if (errors.length) {
            return (0, apigateway_1.buildResponse)(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY, { errors });
        }
        // 3) Passed validation – generate ID and persist
        const id = (0, crypto_1.randomUUID)();
        const payment = { id, amount, currency };
        await (0, payments_1.createPayment)(payment);
        // 4) Return 201 and the generated ID
        return (0, apigateway_1.buildResponse)(http_status_codes_1.StatusCodes.CREATED, { result: id });
    }
    catch (error) {
        console.error('createPayment handler error:', error, 'Event:', event);
        return (0, apigateway_1.buildResponse)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, { error: 'Internal server error' });
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlUGF5bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyZWF0ZVBheW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUF1Qjs7O0FBRXZCLG1DQUFvQztBQUVwQyxpREFBNkQ7QUFDN0QsNkNBQTBFO0FBQzFFLHlEQUFnRDtBQUV6QyxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQzFCLEtBQTJCLEVBQ0ssRUFBRTtJQUNsQyxJQUFJO1FBQ0YsNkJBQTZCO1FBQzdCLE1BQU0sS0FBSyxHQUFHLElBQUEsdUJBQVUsRUFBQyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBUSxDQUFDO1FBQ3BELE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDNUIsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUVoQyw2Q0FBNkM7UUFDN0MsTUFBTSxNQUFNLEdBQTBCLEVBQUUsQ0FBQztRQUN6QyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE9BQU8sSUFBQSwwQkFBYSxFQUFDLCtCQUFXLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ3BFO1FBRUQsaURBQWlEO1FBQ2pELE1BQU0sRUFBRSxHQUFHLElBQUEsbUJBQVUsR0FBRSxDQUFDO1FBQ3hCLE1BQU0sT0FBTyxHQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQztRQUNsRCxNQUFNLElBQUEsd0JBQWMsRUFBQyxPQUFPLENBQUMsQ0FBQztRQUU5QixxQ0FBcUM7UUFDckMsT0FBTyxJQUFBLDBCQUFhLEVBQUMsK0JBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUMzRDtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sSUFBQSwwQkFBYSxFQUFDLCtCQUFXLENBQUMscUJBQXFCLEVBQUUsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDO0tBQzdGO0FBQ0gsQ0FBQyxDQUFDO0FBaENXLFFBQUEsT0FBTyxXQWdDbEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzcmMvY3JlYXRlUGF5bWVudC50c1xuXG5pbXBvcnQgeyByYW5kb21VVUlEIH0gZnJvbSAnY3J5cHRvJztcbmltcG9ydCB7IEFQSUdhdGV3YXlQcm94eUV2ZW50LCBBUElHYXRld2F5UHJveHlSZXN1bHQgfSBmcm9tICdhd3MtbGFtYmRhJztcbmltcG9ydCB7IGJ1aWxkUmVzcG9uc2UsIHBhcnNlSW5wdXQgfSBmcm9tICcuL2xpYi9hcGlnYXRld2F5JztcbmltcG9ydCB7IGNyZWF0ZVBheW1lbnQgYXMgcGVyc2lzdFBheW1lbnQsIFBheW1lbnQgfSBmcm9tICcuL2xpYi9wYXltZW50cyc7XG5pbXBvcnQgeyBTdGF0dXNDb2RlcyB9IGZyb20gJ2h0dHAtc3RhdHVzLWNvZGVzJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoXG4gIGV2ZW50OiBBUElHYXRld2F5UHJveHlFdmVudFxuKTogUHJvbWlzZTxBUElHYXRld2F5UHJveHlSZXN1bHQ+ID0+IHtcbiAgdHJ5IHtcbiAgICAvLyAxKSBQYXJzZSB0aGUgaW5jb21pbmcgSlNPTlxuICAgIGNvbnN0IGlucHV0ID0gcGFyc2VJbnB1dChldmVudC5ib2R5IHx8ICd7fScpIGFzIGFueTtcbiAgICBjb25zdCBhbW91bnQgPSBpbnB1dC5hbW91bnQ7XG4gICAgY29uc3QgY3VycmVuY3kgPSBpbnB1dC5jdXJyZW5jeTtcblxuICAgIC8vIDIpIFZhbGlkYXRlLCBjb2xsZWN0aW5nIGVycm9ycyBpbiBhbiBhcnJheVxuICAgIGNvbnN0IGVycm9yczogeyBtZXNzYWdlOiBzdHJpbmcgfVtdID0gW107XG4gICAgaWYgKHR5cGVvZiBhbW91bnQgIT09ICdudW1iZXInIHx8IGFtb3VudCA8IDApIHtcbiAgICAgIGVycm9ycy5wdXNoKHsgbWVzc2FnZTogJ0ludmFsaWQgcGF5bWVudCBwYXlsb2FkJyB9KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjdXJyZW5jeSAhPT0gJ3N0cmluZycgfHwgIS9eW0EtWl17M30kLy50ZXN0KGN1cnJlbmN5KSkge1xuICAgICAgZXJyb3JzLnB1c2goeyBtZXNzYWdlOiAnSW52YWxpZCBwYXltZW50IHBheWxvYWQnIH0pO1xuICAgIH1cbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoU3RhdHVzQ29kZXMuVU5QUk9DRVNTQUJMRV9FTlRJVFksIHsgZXJyb3JzIH0pO1xuICAgIH1cblxuICAgIC8vIDMpIFBhc3NlZCB2YWxpZGF0aW9uIOKAkyBnZW5lcmF0ZSBJRCBhbmQgcGVyc2lzdFxuICAgIGNvbnN0IGlkID0gcmFuZG9tVVVJRCgpO1xuICAgIGNvbnN0IHBheW1lbnQ6IFBheW1lbnQgPSB7IGlkLCBhbW91bnQsIGN1cnJlbmN5IH07XG4gICAgYXdhaXQgcGVyc2lzdFBheW1lbnQocGF5bWVudCk7XG5cbiAgICAvLyA0KSBSZXR1cm4gMjAxIGFuZCB0aGUgZ2VuZXJhdGVkIElEXG4gICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoU3RhdHVzQ29kZXMuQ1JFQVRFRCwgeyByZXN1bHQ6IGlkIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ2NyZWF0ZVBheW1lbnQgaGFuZGxlciBlcnJvcjonLCBlcnJvciwgJ0V2ZW50OicsIGV2ZW50KTtcbiAgICByZXR1cm4gYnVpbGRSZXNwb25zZShTdGF0dXNDb2Rlcy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsIHsgZXJyb3I6ICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InIH0pO1xuICB9XG59O1xuIl19