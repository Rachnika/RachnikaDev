import mongoose from "mongoose";
// OTP Schema for storing one-time passwords
// This schema includes fields for the email, OTP, and expiration time

const otpSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresdAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 10*60*1000), // 10 minutes from now
    },

}, { timestamps: true });


otpSchema.index({ expiresdAt: 1 }, { expireAfterSeconds: 0 }); // Automatically delete expired OTPs

const OTPModel = mongoose.models.OTP || mongoose.model("OTP", otpSchema, 'otps');
export default OTPModel;