import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import CategoryModel from "@/models/Category.model";


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

        const getCategory=await CategoryModel.find(filter).sort({createdAt:-1}).lean()

        if(!getCategory){
            return response(false,404,"Data not found.")
        }

        return response(true,200,'Data found',getCategory)
        

    } catch (error) {
        return catchError(error)
        
    }
    
}