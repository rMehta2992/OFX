"use strict";
// src/schemas/getPaymentSchema.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPaymentSchema = void 0;
const Joi = require("joi");
exports.GetPaymentSchema = Joi.object({
    pathParameters: Joi.object({
        id: Joi.string()
            .guid({ version: ['uuidv4'] })
            .required()
            .messages({
            'any.required': 'Payment ID is required',
            'string.guid': 'Payment ID must be a valid UUID'
        }),
    }).required(),
}).required();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UGF5bWVudFNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFBheW1lbnRTY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFrQzs7O0FBRWxDLDJCQUEyQjtBQUVkLFFBQUEsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUN6QyxjQUFjLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUN6QixFQUFFLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTthQUNiLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7YUFDN0IsUUFBUSxFQUFFO2FBQ1YsUUFBUSxDQUFDO1lBQ1IsY0FBYyxFQUFFLHdCQUF3QjtZQUN4QyxhQUFhLEVBQUksaUNBQWlDO1NBQ25ELENBQUM7S0FDTCxDQUFDLENBQUMsUUFBUSxFQUFFO0NBQ2QsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gc3JjL3NjaGVtYXMvZ2V0UGF5bWVudFNjaGVtYS50c1xuXG5pbXBvcnQgKiBhcyBKb2kgZnJvbSAnam9pJztcblxuZXhwb3J0IGNvbnN0IEdldFBheW1lbnRTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgcGF0aFBhcmFtZXRlcnM6IEpvaS5vYmplY3Qoe1xuICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgIC5ndWlkKHsgdmVyc2lvbjogWyd1dWlkdjQnXSB9KVxuICAgICAgLnJlcXVpcmVkKClcbiAgICAgIC5tZXNzYWdlcyh7XG4gICAgICAgICdhbnkucmVxdWlyZWQnOiAnUGF5bWVudCBJRCBpcyByZXF1aXJlZCcsXG4gICAgICAgICdzdHJpbmcuZ3VpZCc6ICAgJ1BheW1lbnQgSUQgbXVzdCBiZSBhIHZhbGlkIFVVSUQnXG4gICAgICB9KSxcbiAgfSkucmVxdWlyZWQoKSxcbn0pLnJlcXVpcmVkKCk7XG5cbmV4cG9ydCB0eXBlIEdldFBheW1lbnRJbnB1dCA9IHtcbiAgcGF0aFBhcmFtZXRlcnM6IHsgaWQ6IHN0cmluZyB9O1xufTtcbiJdfQ==