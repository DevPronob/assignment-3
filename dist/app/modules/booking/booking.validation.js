"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
const zod_1 = require("zod");
const createbookingValidation = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({
            required_error: "date is required"
        }),
        user: zod_1.z.string({
            invalid_type_error: "user  is required as string",
            required_error: "user  is required"
        }).optional(),
        carId: zod_1.z.string({
            invalid_type_error: "car id is required as string",
            required_error: "car is required"
        }),
        startTime: zod_1.z.string({
            required_error: "starTime is required"
        }),
        endTime: zod_1.z.string().optional(),
        totalCost: zod_1.z.number().default(0)
    })
});
const updateBookingValidation = zod_1.z.object({
    body: zod_1.z.object({
        endTime: zod_1.z.string().optional(),
        totalCost: zod_1.z.number().default(0)
    })
});
exports.bookingValidation = {
    createbookingValidation,
    updateBookingValidation
};
