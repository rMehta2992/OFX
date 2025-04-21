"use strict";
// src/schemas/listPaymentsSchema.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPaymentsSchema = void 0;
const Joi = require("joi");
/**
 * Joi schema for validating the query parameters of listPayments handler
 */
exports.ListPaymentsSchema = Joi.object({
    queryStringParameters: Joi.object({
        currency: Joi.string()
            .length(3)
            .uppercase()
            .trim()
            .optional()
            .messages({
            'string.length': 'Currency filter must be a 3-letter code',
            'string.base': 'Currency filter must be text',
        }),
    })
        // Allow omitting the entire queryStringParameters object
        .default({}),
}).required();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdFBheW1lbnRzU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGlzdFBheW1lbnRzU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQ0FBb0M7OztBQUVwQywyQkFBMkI7QUFFM0I7O0dBRUc7QUFDVSxRQUFBLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDM0MscUJBQXFCLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNoQyxRQUFRLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTthQUNuQixNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQ1QsU0FBUyxFQUFFO2FBQ1gsSUFBSSxFQUFFO2FBQ04sUUFBUSxFQUFFO2FBQ1YsUUFBUSxDQUFDO1lBQ1IsZUFBZSxFQUFJLHlDQUF5QztZQUM1RCxhQUFhLEVBQU0sOEJBQThCO1NBQ2xELENBQUM7S0FDTCxDQUFDO1FBQ0EseURBQXlEO1NBQ3hELE9BQU8sQ0FBQyxFQUFFLENBQUM7Q0FDZixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzcmMvc2NoZW1hcy9saXN0UGF5bWVudHNTY2hlbWEudHNcblxuaW1wb3J0ICogYXMgSm9pIGZyb20gJ2pvaSc7XG5cbi8qKlxuICogSm9pIHNjaGVtYSBmb3IgdmFsaWRhdGluZyB0aGUgcXVlcnkgcGFyYW1ldGVycyBvZiBsaXN0UGF5bWVudHMgaGFuZGxlclxuICovXG5leHBvcnQgY29uc3QgTGlzdFBheW1lbnRzU2NoZW1hID0gSm9pLm9iamVjdCh7XG4gIHF1ZXJ5U3RyaW5nUGFyYW1ldGVyczogSm9pLm9iamVjdCh7XG4gICAgY3VycmVuY3k6IEpvaS5zdHJpbmcoKVxuICAgICAgLmxlbmd0aCgzKVxuICAgICAgLnVwcGVyY2FzZSgpXG4gICAgICAudHJpbSgpXG4gICAgICAub3B0aW9uYWwoKVxuICAgICAgLm1lc3NhZ2VzKHtcbiAgICAgICAgJ3N0cmluZy5sZW5ndGgnOiAgICdDdXJyZW5jeSBmaWx0ZXIgbXVzdCBiZSBhIDMtbGV0dGVyIGNvZGUnLFxuICAgICAgICAnc3RyaW5nLmJhc2UnOiAgICAgJ0N1cnJlbmN5IGZpbHRlciBtdXN0IGJlIHRleHQnLFxuICAgICAgfSksXG4gIH0pXG4gICAgLy8gQWxsb3cgb21pdHRpbmcgdGhlIGVudGlyZSBxdWVyeVN0cmluZ1BhcmFtZXRlcnMgb2JqZWN0XG4gICAgLmRlZmF1bHQoe30pLFxufSkucmVxdWlyZWQoKTtcblxuZXhwb3J0IHR5cGUgTGlzdFBheW1lbnRzSW5wdXQgPSB7XG4gIHF1ZXJ5U3RyaW5nUGFyYW1ldGVyczoge1xuICAgIGN1cnJlbmN5Pzogc3RyaW5nO1xuICB9O1xufTtcbiJdfQ==