import mongoose from "mongoose";
// Media Schema for storing one-time passwords
// This schema includes fields for the email, Media, and expiration time

const couponSchema = new mongoose.Schema({

    code:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    discountPercent:{
        type:Number,
        required:true,
        trim:true
    },
    minShoppingAmount:{
        type:Number,
        required:true,
        trim:true
    },
    validity:{
        type:Date,
        required:true,
    },

    deletedAt: {
        type: Date,
        default:null,
        index:true
    }

}, { timestamps: true });



const CouponModel = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema, 'coupons');
export default CouponModel;