import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import ProductModel from "@/models/Product.model";



export async function GET(request) {
    try {
        const auth=await isAuthenticated('admin')

        if(!auth.isAuth){
            return response(false,403,"Unauthorized access.")
        }

        await connectDB()


        const filter={
            deletedAt:null
        }

        const getProduct=await ProductModel.find(filter).select('-description').sort({createdAt:-1}).lean()

        if(!getProduct){
            return response(false,404,"Data not found.")
        }

        return response(true,200,'Data found',getProduct)
        

    } catch (error) {
        return catchError(error)
        
    }
    
}