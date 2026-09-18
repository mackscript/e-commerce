import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateOtp } from "../utils/otp";
import EmailVerification from "../models/EmailVerification";
import { sendVerificationOtp } from "./email.service";
import { generateAccessToken } from "../utils/jwt";


// import { generateAccessToken } from "../services";

interface RegisterInput {
    name: string,
    email: string,
}

interface VerifyOtpInput {
    email: string;
    otp: string;
}


export const registerUser = async ({
    name,
    email,

}: RegisterInput) => {

    const normalizedEmail = email.toLowerCase().trim()

    let user = await User.findOne({
        email: normalizedEmail,
    });



    if (!user) {
        user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            role: "user",
            isEmailVerified: false,
            isActive: true,
        });
    } else {
        user.name = name.trim();
        await user.save();
    }
    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);

    const expiresInMinutes = Number(
        process.env.OTP_EXPIRES_IN_MINUTES || 10,
    );

    const expiresAt = new Date(
        Date.now() + expiresInMinutes * 60 * 1000,
    );
    await EmailVerification.findOneAndDelete({
        userId: user._id,
    });
    await EmailVerification.create({
        userId: user._id,
        otpHash,
        expiresAt,
        attempts: 0,
    });
    await sendVerificationOtp(
        normalizedEmail,
        otp,
    );

    return {
        email: normalizedEmail,
        expiresInMinutes,
    };
}


export const verifyRegistrationOtp = async ({
    otp,
    email,
}: VerifyOtpInput) => {

    const normalizedEmail = email.toLowerCase().trim()

    let user = await User.findOne({
        email: normalizedEmail,
    });

    if (!user) {
        throw new Error("User not found")
    }


    const verification = await EmailVerification.findOne({
        userId: user._id
    })

    if (!verification) {
        throw new Error(
            "OTP not found or has expired",
        );
    }

    if (verification.expiresAt < new Date()) {
        await EmailVerification.deleteOne({
            _id: verification._id,
        });

        throw new Error("OTP has expired");
    }
    const isOtpValid = await bcrypt.compare(
        otp,
        verification.otpHash,
    );

    if (!isOtpValid) {
        verification.attempts += 1;
        await verification.save();

        throw new Error("Invalid OTP");
    }

    user.isEmailVerified = true;

    await user.save();

    await EmailVerification.deleteOne({
        _id: verification._id,
    });

    const accessToken = generateAccessToken(
        user._id.toString(),
    );

    return {
        accessToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isEmailVerified: user.isEmailVerified,
            isActive: user.isActive,
        },
    };

}

