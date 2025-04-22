'use strict';
// src/listPayments.ts
Object.defineProperty(exports, '__esModule', { value: true });
exports.handler = void 0;
const payments_1 = require('./lib/payments');
const apigateway_1 = require('./lib/apigateway');
const http_status_codes_1 = require('http-status-codes');
const listPaymentsSchema_1 = require('./schemas/listPaymentsSchema');
const handler = async (event) => {
  var _a;
  try {
    // 1. Read optional currency filter and params
    const currency =
      (_a = event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.currency;
    const params = event.queryStringParameters || {};
    // 2. Validate schema
    const { error, value } = listPaymentsSchema_1.listPaymentsSchema.validate(params);
    if (error) {
      return (0, apigateway_1.buildResponse)(http_status_codes_1.StatusCodes.BAD_REQUEST, {
        errors: error.details,
      });
    }
    // 3. Fetch payments (filtered or not)
    const paymentsData = await (0, payments_1.listPayments)(currency);
    // 4. Return successful response
    return (0, apigateway_1.buildResponse)(http_status_codes_1.StatusCodes.OK, {
      data: paymentsData,
    });
  } catch (err) {
    console.error('Handler error:', err);
    return (0, apigateway_1.buildResponse)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, {
      message: err.message || 'An unexpected error occurred',
      //stack trace can be added for multiple env
    });
  }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdFBheW1lbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGlzdFBheW1lbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQkFBc0I7OztBQUd0Qiw2Q0FBOEM7QUFDOUMsaURBQWlEO0FBQ2pELHlEQUFnRDtBQUNoRCxxRUFBa0U7QUFFM0QsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUMxQixLQUEyQixFQUNLLEVBQUU7O0lBQ2xDLElBQUk7UUFDRiw4Q0FBOEM7UUFDOUMsTUFBTSxRQUFRLEdBQUcsTUFBQSxLQUFLLENBQUMscUJBQXFCLDBDQUFFLFFBQVEsQ0FBQztRQUN2RCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMscUJBQXFCLElBQUksRUFBRSxDQUFDO1FBRWpELHFCQUFxQjtRQUNyQixNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLHVDQUFrQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCxJQUFJLEtBQUssRUFBRTtZQUNULE9BQU8sSUFBQSwwQkFBYSxFQUFDLCtCQUFXLENBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQzFFO1FBRUQsc0NBQXNDO1FBQ3RDLE1BQU0sWUFBWSxHQUFHLE1BQU0sSUFBQSx1QkFBWSxFQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWxELGdDQUFnQztRQUNoQyxPQUFPLElBQUEsMEJBQWEsRUFBQywrQkFBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0tBQzlEO0lBQUMsT0FBTyxHQUFRLEVBQUU7UUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyQyxPQUFPLElBQUEsMEJBQWEsRUFBQywrQkFBVyxDQUFDLHFCQUFxQixFQUFFO1lBQ3RELE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxJQUFJLDhCQUE4QjtZQUN0RCwyQ0FBMkM7U0FDNUMsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDLENBQUM7QUExQlcsUUFBQSxPQUFPLFdBMEJsQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9saXN0UGF5bWVudHMudHNcblxuaW1wb3J0IHsgQVBJR2F0ZXdheVByb3h5RXZlbnQsIEFQSUdhdGV3YXlQcm94eVJlc3VsdCB9IGZyb20gJ2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgbGlzdFBheW1lbnRzIH0gZnJvbSAnLi9saWIvcGF5bWVudHMnO1xuaW1wb3J0IHsgYnVpbGRSZXNwb25zZSB9IGZyb20gJy4vbGliL2FwaWdhdGV3YXknO1xuaW1wb3J0IHsgU3RhdHVzQ29kZXMgfSBmcm9tICdodHRwLXN0YXR1cy1jb2Rlcyc7XG5pbXBvcnQgeyBsaXN0UGF5bWVudHNTY2hlbWEgfSBmcm9tICcuL3NjaGVtYXMvbGlzdFBheW1lbnRzU2NoZW1hJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoXG4gIGV2ZW50OiBBUElHYXRld2F5UHJveHlFdmVudFxuKTogUHJvbWlzZTxBUElHYXRld2F5UHJveHlSZXN1bHQ+ID0+IHtcbiAgdHJ5IHtcbiAgICAvLyAxLiBSZWFkIG9wdGlvbmFsIGN1cnJlbmN5IGZpbHRlciBhbmQgcGFyYW1zXG4gICAgY29uc3QgY3VycmVuY3kgPSBldmVudC5xdWVyeVN0cmluZ1BhcmFtZXRlcnM/LmN1cnJlbmN5O1xuICAgIGNvbnN0IHBhcmFtcyA9IGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycyB8fCB7fTtcblxuICAgIC8vIDIuIFZhbGlkYXRlIHNjaGVtYVxuICAgIGNvbnN0IHsgZXJyb3IsIHZhbHVlIH0gPSBsaXN0UGF5bWVudHNTY2hlbWEudmFsaWRhdGUocGFyYW1zKTtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBidWlsZFJlc3BvbnNlKFN0YXR1c0NvZGVzLkJBRF9SRVFVRVNULCB7IGVycm9yczogZXJyb3IuZGV0YWlscyB9KTtcbiAgICB9XG4gICAgXG4gICAgLy8gMy4gRmV0Y2ggcGF5bWVudHMgKGZpbHRlcmVkIG9yIG5vdClcbiAgICBjb25zdCBwYXltZW50c0RhdGEgPSBhd2FpdCBsaXN0UGF5bWVudHMoY3VycmVuY3kpO1xuXG4gICAgLy8gNC4gUmV0dXJuIHN1Y2Nlc3NmdWwgcmVzcG9uc2VcbiAgICByZXR1cm4gYnVpbGRSZXNwb25zZShTdGF0dXNDb2Rlcy5PSywgeyBkYXRhOiBwYXltZW50c0RhdGEgfSk7XG4gIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcignSGFuZGxlciBlcnJvcjonLCBlcnIpO1xuICAgIHJldHVybiBidWlsZFJlc3BvbnNlKFN0YXR1c0NvZGVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUiwge1xuICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfHwgJ0FuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWQnXG4gICAgICAvL3N0YWNrIHRyYWNlIGNhbiBiZSBhZGRlZCBmb3IgbXVsdGlwbGUgZW52XG4gICAgfSk7XG4gIH1cbn07Il19
