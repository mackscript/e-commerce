import { Schema, model, Document, Types } from "mongoose";

export interface IEmailVerification extends Document {
    userId: Types.ObjectId;
    otpHash: string;
    expiresAt: Date;
    attempts: number;
    createdAt: Date;
    updatedAt: Date;
}

const emailVerificationSchema =
    new Schema<IEmailVerification>(
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
                index: true,
            },

            otpHash: {
                type: String,
                required: true,
            },

            expiresAt: {
                type: Date,
                required: true,
                index: true,
            },

            attempts: {
                type: Number,
                default: 0,
            },
        },
        {
            timestamps: true,
        },

    );

emailVerificationSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 },
);
const EmailVerification =
    model<IEmailVerification>(
        "EmailVerification",
        emailVerificationSchema,
    );

export default EmailVerification;