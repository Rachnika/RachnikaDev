import { connectDB } from "@/lib/databaseConnection";
import { catchError, generateOTP, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/User.model";
import OTPModel from "@/models/Otp.model";
import { sendMail } from "@/lib/sendMail";
import { otpEmail } from "@/email/otpEmail";


export async function POST(request) {
    try {

        await connectDB();
        const payload=await request.json()
        const validationSchema = zSchema.pick({
            email:true
        })

        const validationData=validationSchema.safeParse(payload)
        if(!validationData.success){
            return response(false ,401, "Invalid or missing input field.", validationData.error)
            
        }

        const {email} =validationData.data

        const   getUser=await UserModel.findOne({deletedAt:null , email}).lean()

        if(!getUser){
            return response(false, 404 , 'User not found')
        }

         // remove all previous OTPs for the user
         
        await OTPModel.deleteMany({email}); 

        // Generate a new OTP
        const otp=generateOTP();
        const newOtpData=new OTPModel({
            email: email, 
            otp: otp
        });
        await newOtpData.save();

        // Send OTP to user's email
        const otpSendStatus = await sendMail('Your Login Verification code.',email,otpEmail(otp));
        if (!otpSendStatus) {
            return response(false, 500, "Failed to resend OTP email");
        }
        return response(true, 200, "Please verify your account.");




        
    } catch (error) {
        catchError(error);
        
    }
    
}