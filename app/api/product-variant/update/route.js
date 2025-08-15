import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import ProductVariantModel from "@/models/ProductVariant.model";
// import mongoose from "mongoose";


export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");

    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized access.");
    }

    await connectDB()
    const payload=await request.json()
    const schema = zSchema.pick({
      _id:true,
      product: true,
      sku: true,
      color: true,
      size: true,
      pattern: true,
      quantityVolume: true,
      weight: true,
      sellingPrice: true,
      mrp: true,
      discountPercent: true,
      discountAmount: true,
      taxPercent: true,
      hsnCode: true,
      stockQuantity: true,
      stockStatus: true,
      minOrderQty: true,
      shippingCharges: true,
      deliveryTime: true,
      returnPolicy: true,
      media: true,       
      });

      const validate=schema.safeParse(payload)
      if(!validate.success){
        return response(false,400,"Invalid or missing field.",validate.error)
      }

      const validatedData=validate.data

      //console.log(validatedData)

      const getProductVariant=await ProductVariantModel.findOne({deletedAt:null, _id:validatedData._id})


      console.log(getProductVariant)

      if(!getProductVariant){
        return response(false,404,"Data not found.")
      }

     //getProductVariant.product=validatedData.product
      getProductVariant.color=validatedData.color
      getProductVariant.size=validatedData.size
      getProductVariant.sku=validatedData.sku
      getProductVariant.pattern=validatedData.pattern
      getProductVariant.quantityVolume=validatedData.quantityVolume
      getProductVariant.weight=validatedData.weight
      getProductVariant.mrp=validatedData.mrp
      getProductVariant.sellingPrice=validatedData.sellingPrice
      getProductVariant.discountPercent=validatedData.discountPercent
      getProductVariant.discountAmount=validatedData.discountAmount
      getProductVariant.taxPercent=validatedData.taxPercent
      getProductVariant.hsnCode=validatedData.hsnCode
      getProductVariant.stockQuantity=validatedData.stockQuantity
      getProductVariant.stockStatus=validatedData.stockStatus
      getProductVariant.minOrderQty=validatedData.minOrderQty
      getProductVariant.shippingCharges=validatedData.shippingCharges
      getProductVariant.deliveryTime=validatedData.deliveryTime
      getProductVariant.returnPolicy=validatedData.returnPolicy
      getProductVariant.media=validatedData.media

      await getProductVariant.save()

      

      return response(true,200,"Product Variant updated successfully.")


  } catch (error) {

    return catchError(error)
  }
}
