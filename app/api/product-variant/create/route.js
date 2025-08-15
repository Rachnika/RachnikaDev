import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import ProductVariantModel from "@/models/ProductVariant.model";

export async function POST(request) {
  try {
    const auth = await isAuthenticated("admin");

    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized access.");
    }

    await connectDB();
    const payload = await request.json();
    const schema = zSchema.pick({
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

    const validate = schema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "Invalid or missing field.", validate.error);
    }

    const variantData = validate.data;

    const newProductVariant = new ProductVariantModel({
      product: variantData.product,
      color: variantData.color,
      size: variantData.size,
      sku: variantData.sku,

      pattern: variantData.pattern,
      quantityVolume: variantData.quantityVolume,
      weight: variantData.weight,
      sellingPrice: variantData.sellingPrice,
      mrp: variantData.mrp,
      discountPercent: variantData.discountPercent,
      discountAmount: variantData.discountAmount,
      taxPercent: variantData.taxPercent,
      hsnCode: variantData.hsnCode,
      stockQuantity: variantData.stockQuantity,
      stockStatus: variantData.stockStatus,
      minOrderQty: variantData.minOrderQty,
      shippingCharges: variantData.shippingCharges,
      deliveryTime: variantData.deliveryTime,
      returnPolicy: variantData.returnPolicy,
      media: variantData.media,
    });

    await newProductVariant.save();

    return response(true, 200, "Product Variant added successfully.");
  } catch (error) {
    return catchError(error);
  }
}
