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
            invalid_type_error: "user is required as string",
            required_error: "user is required"
        }).optional(),
        car: zod_1.z.string({
            invalid_type_error: "car id is required as string",
            required_error: "car is required"
        }),
        startTime: zod_1.z.string({
            required_error: "startTime is required"
        }),
        endTime: zod_1.z.string().optional(),
        totalCost: zod_1.z.number().default(0),
        costWithFeature: zod_1.z.number().default(0),
        customerDetails: zod_1.z.object({
            name: zod_1.z.string({
                required_error: "Customer name is required"
            }),
            email: zod_1.z.string({
                required_error: "Customer email is required"
            }).email(),
            nid: zod_1.z.string({
                required_error: "National ID is required"
            }),
            drivingLicense: zod_1.z.string({
                required_error: "Driving License is required"
            }),
        }),
        additionalFeatures: zod_1.z.object({
            gps: zod_1.z.boolean().default(false),
            childSeat: zod_1.z.boolean().default(false),
            mobileWifi: zod_1.z.boolean().default(false),
        }).optional(),
        pickUpLocation: zod_1.z.string({
            required_error: "Pickup location is required"
        }),
        returnCar: zod_1.z.boolean().default(false),
        payment: zod_1.z.boolean().default(false)
    })
});
const updateBookingValidation = zod_1.z.object({
    body: zod_1.z.object({
        endTime: zod_1.z.string().optional(),
        totalCost: zod_1.z.number().default(0),
        costWithFeature: zod_1.z.number().default(0),
        customerDetails: zod_1.z.object({
            name: zod_1.z.string().optional(),
            email: zod_1.z.string().email().optional(),
            nid: zod_1.z.string().optional(),
            drivingLicense: zod_1.z.string().optional(),
        }).optional(),
        additionalFeatures: zod_1.z.object({
            gps: zod_1.z.boolean().default(false),
            childSeat: zod_1.z.boolean().default(false),
            mobileWifi: zod_1.z.boolean().default(false),
        }).optional(),
        pickUpLocation: zod_1.z.string().optional(),
        status: zod_1.z.enum(['pending', 'confirmed', 'cancelled']).optional(),
    })
});
exports.bookingValidation = {
    createbookingValidation,
    updateBookingValidation
};
