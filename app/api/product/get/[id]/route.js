import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import ProductModel from "@/models/Product.model";
import { isValidObjectId } from "mongoose";



export async function GET(request,{params}) {
    try {
        const auth=await isAuthenticated('admin')

        if(!auth.isAuth){
            return response(false,403,"Unauthorized access.")
        }

        await connectDB()

        const getParams=await params
        const id=getParams.id

        const filter={
            deletedAt:null
        }
        if(!isValidObjectId(id)){
            return response(false,400,"Invalid Object Id.")
        }

        filter._id=id

        const getProduct=await ProductModel.findOne(filter).populate('_id').lean()

        if(!getProduct){
            return response(false,404,"Product not found.")
        }
        
        return response(true,200,"Product found.",getProduct)

    } catch (error) {
        return catchError(error)
        
    }
    
}