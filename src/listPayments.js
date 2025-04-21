"use strict";
// src/listPayments.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const payments_1 = require("./lib/payments");
const apigateway_1 = require("./lib/apigateway");
const http_status_codes_1 = require("http-status-codes");
const handler = async (event) => {
    var _a;
    try {
        // 1. Read optional currency filter
        const currency = (_a = event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.currency;
        // 2. If provided and invalid (not exactly 3 uppercase letters), return 400
        if (currency && !/^[A-Z]{3}$/.test(currency)) {
            return (0, apigateway_1.buildResponse)(http_status_codes_1.StatusCodes.BAD_REQUEST, {
                errors: [{ message: 'Invalid currency filter' }],
            });
        }
        // 3. Fetch payments (filtered or not)
        const paymentsData = await (0, payments_1.listPayments)(currency);
        // 4. Return successful response
        return (0, apigateway_1.buildResponse)(http_status_codes_1.StatusCodes.OK, { data: paymentsData });
    }
    catch (error) {
        console.error('listPayments handler error:', error);
        return (0, apigateway_1.buildResponse)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, { error: 'Internal server error' });
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdFBheW1lbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGlzdFBheW1lbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQkFBc0I7OztBQUd0Qiw2Q0FBOEM7QUFDOUMsaURBQWlEO0FBQ2pELHlEQUFnRDtBQUV6QyxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQzFCLEtBQTJCLEVBQ0ssRUFBRTs7SUFDbEMsSUFBSTtRQUNGLG1DQUFtQztRQUNuQyxNQUFNLFFBQVEsR0FBRyxNQUFBLEtBQUssQ0FBQyxxQkFBcUIsMENBQUUsUUFBUSxDQUFDO1FBRXZELDJFQUEyRTtRQUMzRSxJQUFJLFFBQVEsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDNUMsT0FBTyxJQUFBLDBCQUFhLEVBQUMsK0JBQVcsQ0FBQyxXQUFXLEVBQUU7Z0JBQzVDLE1BQU0sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLENBQUM7YUFDakQsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxzQ0FBc0M7UUFDdEMsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFBLHVCQUFZLEVBQUMsUUFBUSxDQUFDLENBQUM7UUFFbEQsZ0NBQWdDO1FBQ2hDLE9BQU8sSUFBQSwwQkFBYSxFQUFDLCtCQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7S0FDOUQ7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEQsT0FBTyxJQUFBLDBCQUFhLEVBQUMsK0JBQVcsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxDQUFDLENBQUM7S0FDN0Y7QUFDSCxDQUFDLENBQUM7QUF2QlcsUUFBQSxPQUFPLFdBdUJsQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9saXN0UGF5bWVudHMudHNcblxuaW1wb3J0IHsgQVBJR2F0ZXdheVByb3h5RXZlbnQsIEFQSUdhdGV3YXlQcm94eVJlc3VsdCB9IGZyb20gJ2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgbGlzdFBheW1lbnRzIH0gZnJvbSAnLi9saWIvcGF5bWVudHMnO1xuaW1wb3J0IHsgYnVpbGRSZXNwb25zZSB9IGZyb20gJy4vbGliL2FwaWdhdGV3YXknO1xuaW1wb3J0IHsgU3RhdHVzQ29kZXMgfSBmcm9tICdodHRwLXN0YXR1cy1jb2Rlcyc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyID0gYXN5bmMgKFxuICBldmVudDogQVBJR2F0ZXdheVByb3h5RXZlbnRcbik6IFByb21pc2U8QVBJR2F0ZXdheVByb3h5UmVzdWx0PiA9PiB7XG4gIHRyeSB7XG4gICAgLy8gMS4gUmVhZCBvcHRpb25hbCBjdXJyZW5jeSBmaWx0ZXJcbiAgICBjb25zdCBjdXJyZW5jeSA9IGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycz8uY3VycmVuY3k7XG5cbiAgICAvLyAyLiBJZiBwcm92aWRlZCBhbmQgaW52YWxpZCAobm90IGV4YWN0bHkgMyB1cHBlcmNhc2UgbGV0dGVycyksIHJldHVybiA0MDBcbiAgICBpZiAoY3VycmVuY3kgJiYgIS9eW0EtWl17M30kLy50ZXN0KGN1cnJlbmN5KSkge1xuICAgICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoU3RhdHVzQ29kZXMuQkFEX1JFUVVFU1QsIHtcbiAgICAgICAgZXJyb3JzOiBbeyBtZXNzYWdlOiAnSW52YWxpZCBjdXJyZW5jeSBmaWx0ZXInIH1dLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gMy4gRmV0Y2ggcGF5bWVudHMgKGZpbHRlcmVkIG9yIG5vdClcbiAgICBjb25zdCBwYXltZW50c0RhdGEgPSBhd2FpdCBsaXN0UGF5bWVudHMoY3VycmVuY3kpO1xuXG4gICAgLy8gNC4gUmV0dXJuIHN1Y2Nlc3NmdWwgcmVzcG9uc2VcbiAgICByZXR1cm4gYnVpbGRSZXNwb25zZShTdGF0dXNDb2Rlcy5PSywgeyBkYXRhOiBwYXltZW50c0RhdGEgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignbGlzdFBheW1lbnRzIGhhbmRsZXIgZXJyb3I6JywgZXJyb3IpO1xuICAgIHJldHVybiBidWlsZFJlc3BvbnNlKFN0YXR1c0NvZGVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUiwgeyBlcnJvcjogJ0ludGVybmFsIHNlcnZlciBlcnJvcicgfSk7XG4gIH1cbn07XG4iXX0=