import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export const sendVerificationOtp = async (
    email: string,
    otp: string,
): Promise<void> => {
    await transporter.sendMail({
        from: `"ShopFlow" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Verify your ShopFlow account",
        text: `Your verification code is ${otp}. It expires in 10 minutes.`,
        html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Verify your ShopFlow account</h2>

        <p>Your verification code is:</p>

        <h1>${otp}</h1>

        <p>This code expires in 10 minutes.</p>

        <p>If you didn't request this code, you can ignore this email.</p>
      </div>
    `,
    });
};