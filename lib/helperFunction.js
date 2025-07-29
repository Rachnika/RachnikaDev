import { NextResponse } from "next/server";


// Function to create a standardized response format
// This function can be used in your API routes to return a consistent response format
export const response=(success, statusCode,message,data={})=>{
    return NextResponse.json({
        success,
        statusCode,
        message,
        data
        
    }) 
}


// Function to handle errors and return a standardized response
// This function can be used in your API routes to catch errors and return a consistent response format

export const catchError=(error,customMessage)=>{
    // handling duplicate key error
    if (error.code === 11000) {
        const keys = Object.keys(error.keyPattern).join(",");
        error.message = `Duplicate field error: ${keys}. These fields must be unique.`; 
}

let errorObj={}

if(process.env.NODE_ENV === "development") {
    errorObj={
        message: error.message,
        error
    }

}else {
    errorObj={
        message: customMessage || "Internal Server Error",
    }
}
    return NextResponse.json({
        success: false,
        statusCode: error.code,
        ...errorObj
    })
}


// OTP generation function
export const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
    return otp;
}
