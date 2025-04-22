'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.handler = void 0;
const apigateway_1 = require('./lib/apigateway');
const payments_1 = require('./lib/payments');
const getPaymentSchema_1 = require('./schemas/getPaymentSchema');
const http_status_codes_1 = require('http-status-codes');
const handler = async (event) => {
  var _a;
  try {
    // 1) Parse the params and validate
    const id = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id;
    if (!id) {
      return (0, apigateway_1.buildResponse)(http_status_codes_1.StatusCodes.BAD_REQUEST, {
        message: 'Missing path parameter: id',
      });
    }
    const { error } = getPaymentSchema_1.getPaymentSchema.validate({ id });
    if (error) {
      return (0, apigateway_1.buildResponse)(http_status_codes_1.StatusCodes.BAD_REQUEST, {
        errors: error.details,
      });
    }
    // 2) Passed validation - fetch payment details
    const payment = await (0, payments_1.getPayment)(id);
    if (!payment) {
      return (0, apigateway_1.buildResponse)(http_status_codes_1.StatusCodes.NOT_FOUND, {
        message: 'Payment not found',
      });
    }
    // 3: Return 200 and payment record by id
    return (0, apigateway_1.buildResponse)(http_status_codes_1.StatusCodes.OK, payment);
  } catch (err) {
    console.error('Handler error:', err);
    return (0, apigateway_1.buildResponse)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, {
      message: err.message || 'An unexpected error occurred',
      //stack trace can be added for multiple env
    });
  }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UGF5bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFBheW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaURBQWlEO0FBQ2pELDZDQUE0QztBQUM1QyxpRUFBOEQ7QUFDOUQseURBQWdEO0FBRXpDLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxLQUEyQixFQUFrQyxFQUFFOztJQUMzRixJQUFJO1FBQ0YsbUNBQW1DO1FBQ25DLE1BQU0sRUFBRSxHQUFHLE1BQUEsS0FBSyxDQUFDLGNBQWMsMENBQUUsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDUCxPQUFPLElBQUEsMEJBQWEsRUFBQywrQkFBVyxDQUFDLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxDQUFDLENBQUM7U0FDMUY7UUFFRCxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsbUNBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwRCxJQUFJLEtBQUssRUFBRTtZQUNULE9BQU8sSUFBQSwwQkFBYSxFQUFDLCtCQUFXLENBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQzFFO1FBRUQsK0NBQStDO1FBQy9DLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBQSxxQkFBVSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLElBQUEsMEJBQWEsRUFBQywrQkFBVyxDQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUM7U0FDL0U7UUFFRCx5Q0FBeUM7UUFDekMsT0FBTyxJQUFBLDBCQUFhLEVBQUMsK0JBQVcsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDL0M7SUFBQyxPQUFPLEdBQVEsRUFBRTtRQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sSUFBQSwwQkFBYSxFQUFDLCtCQUFXLENBQUMscUJBQXFCLEVBQUU7WUFDdEQsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLElBQUksOEJBQThCO1lBQ3RELDJDQUEyQztTQUM1QyxDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsQ0FBQztBQTVCVyxRQUFBLE9BQU8sV0E0QmxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBJR2F0ZXdheVByb3h5RXZlbnQsIEFQSUdhdGV3YXlQcm94eVJlc3VsdCB9IGZyb20gJ2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgYnVpbGRSZXNwb25zZSB9IGZyb20gJy4vbGliL2FwaWdhdGV3YXknO1xuaW1wb3J0IHsgZ2V0UGF5bWVudCB9IGZyb20gJy4vbGliL3BheW1lbnRzJztcbmltcG9ydCB7IGdldFBheW1lbnRTY2hlbWEgfSBmcm9tICcuL3NjaGVtYXMvZ2V0UGF5bWVudFNjaGVtYSc7XG5pbXBvcnQgeyBTdGF0dXNDb2RlcyB9IGZyb20gJ2h0dHAtc3RhdHVzLWNvZGVzJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50KTogUHJvbWlzZTxBUElHYXRld2F5UHJveHlSZXN1bHQ+ID0+IHtcbiAgdHJ5IHtcbiAgICAvLyAxKSBQYXJzZSB0aGUgcGFyYW1zIGFuZCB2YWxpZGF0ZVxuICAgIGNvbnN0IGlkID0gZXZlbnQucGF0aFBhcmFtZXRlcnM/LmlkO1xuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBidWlsZFJlc3BvbnNlKFN0YXR1c0NvZGVzLkJBRF9SRVFVRVNULCB7IG1lc3NhZ2U6ICdNaXNzaW5nIHBhdGggcGFyYW1ldGVyOiBpZCcgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBlcnJvciB9ID0gZ2V0UGF5bWVudFNjaGVtYS52YWxpZGF0ZSh7IGlkIH0pO1xuICAgIGlmIChlcnJvcikge1xuICAgICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoU3RhdHVzQ29kZXMuQkFEX1JFUVVFU1QsIHsgZXJyb3JzOiBlcnJvci5kZXRhaWxzIH0pO1xuICAgIH1cblxuICAgIC8vIDIpIFBhc3NlZCB2YWxpZGF0aW9uIC0gZmV0Y2ggcGF5bWVudCBkZXRhaWxzXG4gICAgY29uc3QgcGF5bWVudCA9IGF3YWl0IGdldFBheW1lbnQoaWQpO1xuICAgIGlmICghcGF5bWVudCkge1xuICAgICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoU3RhdHVzQ29kZXMuTk9UX0ZPVU5ELCB7IG1lc3NhZ2U6ICdQYXltZW50IG5vdCBmb3VuZCcgfSk7XG4gICAgfVxuXG4gICAgLy8gMzogUmV0dXJuIDIwMCBhbmQgcGF5bWVudCByZWNvcmQgYnkgaWRcbiAgICByZXR1cm4gYnVpbGRSZXNwb25zZShTdGF0dXNDb2Rlcy5PSywgcGF5bWVudCk7XG4gIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcignSGFuZGxlciBlcnJvcjonLCBlcnIpO1xuICAgIHJldHVybiBidWlsZFJlc3BvbnNlKFN0YXR1c0NvZGVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUiwge1xuICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfHwgJ0FuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWQnXG4gICAgICAvL3N0YWNrIHRyYWNlIGNhbiBiZSBhZGRlZCBmb3IgbXVsdGlwbGUgZW52XG4gICAgfSk7XG4gIH1cbn07Il19
