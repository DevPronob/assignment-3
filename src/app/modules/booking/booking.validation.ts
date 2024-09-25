import { z } from "zod"

const createbookingValidation = z.object({
    body: z.object({
        date: z.string({
            required_error: "date is required"
        }),
        user: z.string({
            invalid_type_error: "user is required as string",
            required_error: "user is required"
        }).optional(),
        car: z.string({
            invalid_type_error: "car id is required as string",
            required_error: "car is required"
        }),
        startTime: z.string({
            required_error: "startTime is required"
        }),
        endTime: z.string().optional(),
        totalCost: z.number().default(0),
        costWithFeature: z.number().default(0),
        customerDetails: z.object({
            name: z.string({
                required_error: "Customer name is required"
            }),
            email: z.string({
                required_error: "Customer email is required"
            }).email(),
            nid: z.string({
                required_error: "National ID is required"
            }),
            drivingLicense: z.string({
                required_error: "Driving License is required"
            }),
        }),
        additionalFeatures: z.object({
            gps: z.boolean().default(false),
            childSeat: z.boolean().default(false),
            mobileWifi: z.boolean().default(false),
        }).optional(),
        pickUpLocation: z.string({
            required_error: "Pickup location is required"
        }),
        returnCar: z.boolean().default(false),
        payment: z.boolean().default(false)
    })
});


const updateBookingValidation = z.object({
    body: z.object({
        endTime: z.string().optional(),
        totalCost: z.number().default(0),
        costWithFeature: z.number().default(0),
        customerDetails: z.object({
            name: z.string().optional(),
            email: z.string().email().optional(),
            nid: z.string().optional(),
            drivingLicense: z.string().optional(),
        }).optional(),
        additionalFeatures: z.object({
            gps: z.boolean().default(false),
            childSeat: z.boolean().default(false),
            mobileWifi: z.boolean().default(false),
        }).optional(),
        pickUpLocation: z.string().optional(),
        status: z.enum(['pending', 'confirmed', 'cancelled']).optional(),
    })
});

export const bookingValidation = {
    createbookingValidation,
    updateBookingValidation
}