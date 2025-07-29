import { catchError, generateOTP } from "@/lib/helperFunction";
import { connectDB } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import { otpEmail } from "@/email/otpEmail";
import OTPModel from "@/models/Otp.model";
import UserModel  from "@/models/User.model";
import { sendMail } from "@/lib/sendMail";
import { response } from "@/lib/helperFunction";




export async function POST(request){

    try {
        await connectDB();
        const payload = await request.json();
        const validationSchema = zSchema.pick({
            email: true
        });
        const validatedData = validationSchema.safeParse(payload);
        if (!validatedData.success) {
            return response(false, 401, "Invalid input data", validatedData.error);
        }

        const { email } = validatedData.data;

        const getUser= await UserModel.findOne({ email, deletedAt: null }).lean(); // Ensure user is not deleted
        if (!getUser) {
            return response(false, 404, "User not found");
        }


        

        // remove all previous OTPs for the user
        await OTPModel.deleteMany({email}); 

        // Generate a new OTP
        const otp=generateOTP();
        const newOtpData=new otpModel({
            email: email, 
            otp: otp
        });
        await newOtpData.save();

        // Send OTP to user's email
        const otpSendStatus = await sendMail('Your Login Verification code.',email,otpEmail(otp));
        if (!otpSendStatus) {
            return response(false, 500, "Failed to resend OTP email");
        }
        return response(true, 200, "OTP sent successfully to your email");


        
    } catch (error) {
        return catchError(error);
    }

}