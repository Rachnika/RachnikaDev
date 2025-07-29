import { catchError, response } from "@/lib/helperFunction";
import { connectDB } from "@/lib/databaseConnection";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";
import { emailVerificationLink } from "@/email/emailVerificationLink";
import { z } from "zod";
import OTPModel from "@/models/Otp.model";
import { otpEmail } from "@/email/otpEmail";
import { generateOTP } from "@/lib/helperFunction";

// POST method for user login
// This method handles user login, email verification, and OTP generation
export async function POST(request) {
  try {
    // Connect to the database
    await connectDB();
    // Validation schema for email and password
    const payload = await request.json();
    // validation schema
    // Ensure the email is a valid string and password is a string
    const validationSchema = zSchema
      .pick({
        email: true,
      })
      .extend({
        password: z.string(),
      });
    // Validate the incoming request data
    // This will ensure that the email and password are present and valid
    const validatedData = validationSchema.safeParse(payload);
    // Check if the data is valid
    if (!validatedData.success) {
      return response(
        false,
        401,
        "Invalid or missing data",
        validatedData.error
      );
    }
    // Extract email and password from validated data
    // This will be used to check if the user exists and to verify the password
    const { email, password } = validatedData.data;
    // Check if user exists
    const user = await UserModel.findOne({
      email,
      deletedAt: null,
    }).select("+password"); // Include password field for comparison

    // If user does not exist, return an error response
    // This will inform the client that the email or password is incorrect
    if (!user) {
      return response(true, 404, "Invalid email or password");
    }

    // resend email verification if not verified
    if (!user.isEmailVerified) {
      const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
      const token = await new SignJWT({ userId: user._id.toString() })
        .setIssuedAt()
        .setExpirationTime("1h")
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .sign(secretKey);

      await sendMail(
        "Email Verification from Rachnika",
        email,
        emailVerificationLink(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`
        )
      );
      return response(
        false,
        401,
        "Email not verified. Please check your email for verification link."
      );
    }

    // Check if password is correct

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return response(true, 400, "Invalid email or password");
    }

    // OTP genearation
    await OTPModel.deleteMany({ email }); // Delete any existing OTPs for the email
    const otp = generateOTP();

    // storing OTP in the database
    const newOtpData = new OTPModel({
      email,
      otp,
    });
    await newOtpData.save();

    // Send OTP to user's email
    const otpEmailStatus = await sendMail(
      "Your login verification code",
      email,
      otpEmail(otp)
    );
    if (!otpEmailStatus) {
      return response(false, 500, "Failed to send OTP email");
    }

    // Return success response with user data and OTP
    // This will inform the client that the OTP has been sent successfully
    return response(
      true,
      200,
      "OTP sent to your email successfully. Please verify your device."
    );
  } catch (error) {
    // Catch any errors that occur during the process
    // This will ensure that any unexpected errors are handled gracefully
    return catchError(error);
  }
}
