import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
}

const getJwtSecret = (): string => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }

    return secret;
};

export const generateAccessToken = (userId: string): string => {
    return jwt.sign(
        {
            userId,
        },
        getJwtSecret(),
        {
            expiresIn: "7d",
        },
    );
};