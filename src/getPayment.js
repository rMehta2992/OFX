"use strict";
// src/getPayment.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const payments_1 = require("./lib/payments");
const apigateway_1 = require("./lib/apigateway");
const http_status_codes_1 = require("http-status-codes");
const handler = async (event) => {
    var _a;
    try {
        const paymentId = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id;
        if (!paymentId) {
            return (0, apigateway_1.buildResponse)(http_status_codes_1.StatusCodes.BAD_REQUEST, { error: 'Missing payment ID parameter' });
        }
        const payment = await (0, payments_1.getPayment)(paymentId);
        if (!payment) {
            return (0, apigateway_1.buildResponse)(http_status_codes_1.StatusCodes.NOT_FOUND, { error: 'Payment not found' });
        }
        return (0, apigateway_1.buildResponse)(http_status_codes_1.StatusCodes.OK, payment);
    }
    catch (err) {
        console.error('getPayment handler error:', err);
        return (0, apigateway_1.buildResponse)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, { error: 'Internal server error' });
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UGF5bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFBheW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjs7O0FBR3BCLDZDQUE0RDtBQUM1RCxpREFBaUQ7QUFDakQseURBQWdEO0FBRXpDLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFDMUIsS0FBMkIsRUFDSyxFQUFFOztJQUNsQyxJQUFJO1FBQ0YsTUFBTSxTQUFTLEdBQUcsTUFBQSxLQUFLLENBQUMsY0FBYywwQ0FBRSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLE9BQU8sSUFBQSwwQkFBYSxFQUFDLCtCQUFXLENBQUMsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLDhCQUE4QixFQUFFLENBQUMsQ0FBQztTQUMxRjtRQUVELE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBQSxxQkFBWSxFQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLElBQUEsMEJBQWEsRUFBQywrQkFBVyxDQUFDLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUM7U0FDN0U7UUFFRCxPQUFPLElBQUEsMEJBQWEsRUFBQywrQkFBVyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUMvQztJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQywyQkFBMkIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoRCxPQUFPLElBQUEsMEJBQWEsRUFBQywrQkFBVyxDQUFDLHFCQUFxQixFQUFFLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQztLQUM3RjtBQUNILENBQUMsQ0FBQztBQW5CVyxRQUFBLE9BQU8sV0FtQmxCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gc3JjL2dldFBheW1lbnQudHNcblxuaW1wb3J0IHsgQVBJR2F0ZXdheVByb3h5RXZlbnQsIEFQSUdhdGV3YXlQcm94eVJlc3VsdCB9IGZyb20gJ2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgZ2V0UGF5bWVudCBhcyBmZXRjaFBheW1lbnQgfSBmcm9tICcuL2xpYi9wYXltZW50cyc7XG5pbXBvcnQgeyBidWlsZFJlc3BvbnNlIH0gZnJvbSAnLi9saWIvYXBpZ2F0ZXdheSc7XG5pbXBvcnQgeyBTdGF0dXNDb2RlcyB9IGZyb20gJ2h0dHAtc3RhdHVzLWNvZGVzJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoXG4gIGV2ZW50OiBBUElHYXRld2F5UHJveHlFdmVudFxuKTogUHJvbWlzZTxBUElHYXRld2F5UHJveHlSZXN1bHQ+ID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXltZW50SWQgPSBldmVudC5wYXRoUGFyYW1ldGVycz8uaWQ7XG4gICAgaWYgKCFwYXltZW50SWQpIHtcbiAgICAgIHJldHVybiBidWlsZFJlc3BvbnNlKFN0YXR1c0NvZGVzLkJBRF9SRVFVRVNULCB7IGVycm9yOiAnTWlzc2luZyBwYXltZW50IElEIHBhcmFtZXRlcicgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcGF5bWVudCA9IGF3YWl0IGZldGNoUGF5bWVudChwYXltZW50SWQpO1xuICAgIGlmICghcGF5bWVudCkge1xuICAgICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoU3RhdHVzQ29kZXMuTk9UX0ZPVU5ELCB7IGVycm9yOiAnUGF5bWVudCBub3QgZm91bmQnIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBidWlsZFJlc3BvbnNlKFN0YXR1c0NvZGVzLk9LLCBwYXltZW50KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignZ2V0UGF5bWVudCBoYW5kbGVyIGVycm9yOicsIGVycik7XG4gICAgcmV0dXJuIGJ1aWxkUmVzcG9uc2UoU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLCB7IGVycm9yOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyB9KTtcbiAgfVxufTtcbiJdfQ==