import type { Request, Response } from "express";
import { registerUser, verifyRegistrationOtp } from "../services/auth.service";
import {
    registerSchema,
    verifyOtpSchema,
} from "../utils/validation";

export const register = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const validatedData = registerSchema.parse(req.body);

        const result = await registerUser(
            validatedData,
        );
        res.status(201).json({
            success: true,
            message: "OTP sent to your email",
            data: result,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });

            return;
        }

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

export const verifyOtp = async (
    req: Request,
    res: Response,
): Promise<void> => {
    console.log('req', req);
    try {
        const validatedData = verifyOtpSchema.parse(req.body)
        const result = await verifyRegistrationOtp(
            validatedData,
        );
        res.status(201).json({
            success: true,
            message: "Email verify Succesfully",
            data: result,
        });

    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });

            return;
        }

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}