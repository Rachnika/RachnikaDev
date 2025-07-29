import { catchError, response } from "@/lib/helperFunction";
import {connectDB} from "@/lib/databaseConnection";
import UserModel from "@/models/User.model";
import { jwtVerify } from "jose";
// import { isValidObjectId } from "mongoose";


export async function POST(request) {
  try {
    await connectDB();
    const { token } = await request.json();

    //console.log("Token received for email verification:", token);

    if (!token) {
      return response(false, 400, "Token is required for email verification");
    }
    // Verify the token
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    // Use the jose library to verify the JWT token
    const decoded = await jwtVerify(token, secret);
    // Extract userId from the decoded token
    const userId = decoded.payload.userId;

   // console.log(decoded);

    // if(!isValidObjectId(userId)) {
    //   return response(false, 400, "Invalid user ID",userId);
    // }


    // Find the user by userId
    const user = await UserModel.findById(userId);
    // Check if user exists
    if (!user) {
      return response(false, 404, "User not found");
    }
    // Check if the user is already verified
    user.isEmailVerified = true;
    // Save the user with updated isEmailVerified field
    await user.save();
    // Return success response
    return response(true, 200, "Email verified successfully");
  } catch (error) {
    return catchError(error);
  }
}
