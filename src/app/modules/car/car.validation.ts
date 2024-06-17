import { z } from "zod";


const carValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "name is required"
        }),
        description: z.string({
            required_error: "Description is required"
        }),
        color: z.string({
            required_error: "Color is required"
        }),
        isElectric: z.boolean(),
        status: z.enum(['available', 'unavailable']).default('available'),
        features: z.array(z.string()).default([]),
        pricePerHour: z.number(),
        isDeleted: z.boolean().default(false)
    })
})
const updateCarValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        color: z.string().optional(),
        isElectric: z.boolean().optional(),
        status: z.enum(['available', 'unavailable']).default('available').optional(),
        features: z.array(z.string()).default([]).optional(),
        pricePerHour: z.number().optional(),
        isDeleted: z.boolean().default(false).optional()
    })
})

export const CarValidation = {
    carValidationSchema,
    updateCarValidationSchema
}


