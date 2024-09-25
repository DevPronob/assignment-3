import { z } from 'zod';

export const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "name is required"
        }),
        email: z.string().email("Invalid email address"),
        role: z.enum(['admin', 'user']).default('user'),
        password: z.string({
            required_error: "password is required"
        }).min(3, { message: "Password must be at least 3 characters" }),
        phone: z.string({
            required_error: "phone number is required"
        }),
        address: z.string(),
        status: z.enum(['active', 'blocked']).default('active')
    })
});

export const updateUserValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().email("Invalid email address").optional(),
        role: z.enum(['admin', 'user']).default('user').optional(),
        password: z.string().min(3, { message: "Password must be at least 3 characters" }).optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        status: z.enum(['active', 'blocked']).default('active').optional()
    })
});
export const loginUserValidationSchema = z.object({
    body: z.object({

        email: z.string().email("Invalid email address"),
        password: z.string({
            required_error: "password is required"
        }).min(2, { message: "Password must be at least 2 characters" }),
    })
});
export const UserValidations = {
    createUserValidationSchema,
    loginUserValidationSchema,
    updateUserValidationSchema
};