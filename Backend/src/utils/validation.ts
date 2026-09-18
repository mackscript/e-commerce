import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters"),

    email: z
        .string()
        .trim()
        .email("Please provide a valid email address"),


});

export const verifyOtpSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please provide a valid email address"),

    otp: z
        .string()
        .regex(/^\d{6}$/, "OTP must be a 6-digit number"),
});

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please provide a valid email address"),
});

export type RegisterInput = z.infer<typeof registerSchema>;