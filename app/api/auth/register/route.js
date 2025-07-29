import { emailVerificationLink } from "@/email/emailVerificationLink";
import {connectDB}  from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";

export async function POST(request) {
  try {
    await connectDB();

    // validation schema
    const validationSchema = zSchema.pick({
      name: true,
      email: true,
      password: true,
    });

    const payload = await request.json();

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

    const { name, email, password } = validatedData.data;

    // Check if user already exists
    const checkUser = await UserModel.exists({ email });
    if (checkUser) {
      return response(true, 409, "User already exists with this email");
    }

    // Create new user
    const NewRegistration = await UserModel.create({
      name,
      email,
      password,
    });

    await NewRegistration.save();

    // Generate JWT token
    // Ensure the secret key is defined in your environment variables
    const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT({ userId: NewRegistration._id.toString() })
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
      true,
      201,
      "User registered successfully, please verify your email"
    );
  } catch (error) {
    catchError(error);
  }
}
