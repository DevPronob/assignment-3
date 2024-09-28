"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarValidation = void 0;
const zod_1 = require("zod");
const carValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is required"
        }),
        description: zod_1.z.string({
            required_error: "Description is required"
        }),
        color: zod_1.z.string({
            required_error: "Color is required"
        }),
        isElectric: zod_1.z.boolean().optional(),
        status: zod_1.z.enum(['available', 'unavailable']).default('available'),
        features: zod_1.z.array(zod_1.z.string()).default([]),
        pricePerHour: zod_1.z.number(),
        isDeleted: zod_1.z.boolean().default(false),
        images: zod_1.z.array(zod_1.z.string()).default([]),
        featured: zod_1.z.boolean().default(false),
        type: zod_1.z.string()
    })
});
const updateCarValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        color: zod_1.z.string().optional(),
        isElectric: zod_1.z.boolean().optional(),
        status: zod_1.z.enum(['available', 'unavailable']).default('available').optional(),
        features: zod_1.z.array(zod_1.z.string()).default([]).optional(),
        pricePerHour: zod_1.z.number().optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
        images: zod_1.z.array(zod_1.z.string()).default([]),
        featured: zod_1.z.boolean().default(false),
        type: zod_1.z.string().optional()
    })
});
exports.CarValidation = {
    carValidationSchema,
    updateCarValidationSchema
};
