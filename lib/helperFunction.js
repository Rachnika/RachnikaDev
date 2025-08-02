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



export const columnConfig = (column, isCreatedAt=false, isUpdatedAt=false,isDeletedAt=false)=>{
    const newColumn =[...column]

    if(isCreatedAt){
        newColumn.push({
        accessorKey:'createdAt', // database field name 
        header:'Created At',
        cell:({renderedCellValue})=>(new Date(renderedCellValue).toLocaleString())
        })
    }

    if(isUpdatedAt){
        newColumn.push({
        accessorKey:'updatedAt', // database field name 
        header:'Updated At',
        cell:({renderedCellValue})=>(new Date(renderedCellValue).toLocaleString())
        })
    }

    if(isDeletedAt){
        newColumn.push({
        accessorKey:'deletedAt', // database field name 
        header:'Deleted At',
        cell:({renderedCellValue})=>(new Date(renderedCellValue).toLocaleString())
        })
    }

    return newColumn
}
