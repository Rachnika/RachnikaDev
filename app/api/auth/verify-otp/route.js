import { catchError, response } from "@/lib/helperFunction";
import {connectDB} from "@/lib/databaseConnection";
import OTPModel from "@/models/Otp.model";
import UserModel  from "@/models/User.model";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { zSchema } from "@/lib/zodSchema";


export async function POST(request) {
  try {
    await connectDB();
    const payload = await request.json();
    
    const validationSchema = zSchema.pick({
      otp: true,
      email: true,
    });

    const validatedData = validationSchema.safeParse(payload);
    if (!validatedData.success) {
        return response(false, 401, "Invalid input data", validatedData.error);
        }
    const { otp, email } = validatedData.data;

    const getOtpData=await OTPModel.findOne({ email: email, otp: otp });

    if (!getOtpData) {
      return response(false, 404, "Invalid OTP or expired OTP");
    }
    
    const getUserData = await UserModel.findOne({ email: email ,deletedAt: null }).lean(); // Ensure user is not deleted

    if (!getUserData) {
      return response(false, 404, "User not found");
    }

    const loggedInUserData = {
      _id: getUserData._id,
      name: getUserData.name,
      role: getUserData.role,
      avatar: getUserData.avatar,
    };

    const secret=new TextEncoder().encode(process.env.SECRET_KEY); 
    const token = await new SignJWT(loggedInUserData)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(secret);

    const cookeieStore = await cookies()

    cookeieStore.set({
        name: "access_token",
        value: token,
      httpOnly: process.env.NODE_ENV === "production",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",

  });

  // Delete the OTP after successful verification
  await getOtpData.deleteOne();
    return response(true, 200, "Login successfull." ,loggedInUserData);

  }

  
  catch (error) {
    return catchError(error);
  }
}
