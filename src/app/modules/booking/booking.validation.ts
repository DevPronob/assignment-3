import { z } from "zod"

const createbookingValidation = z.object({
    body: z.object({
        date: z.string({
            required_error: "date is required"
        }),
        user: z.string({
            invalid_type_error: "user  is required as string",
            required_error: "user  is required"
        }).optional(),
        carId: z.string({
            invalid_type_error: "car id is required as string",
            required_error: "car is required"
        }),
        startTime: z.string({
            required_error: "starTime is required"
        }),
        endTime: z.string().optional(),
        totalCost: z.number().default(0)
    })
})

const updateBookingValidation = z.object({
    body: z.object({
        endTime: z.string().optional(),
        totalCost: z.number().default(0)
    })
})

export const bookingValidation = {
    createbookingValidation,
    updateBookingValidation
}