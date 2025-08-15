import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import ProductModel from "@/models/Product.model";
import { encode } from "entities";

export async function POST(request) {
  try {
    const auth = await isAuthenticated("admin");

    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized access.");
    }

    await connectDB();
    const payload = await request.json();
    const schema = zSchema.pick({
      name: true,
      slug: true,
      category: true,
      brand: true,
      productType: true,
      usageInstructions: true,
      material: true,
      ageGroup: true,
      description: true,
      status: true,
      warranty: true,
    });

    const validate = schema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "Invalid or missing field.", validate.error);
    }

    const productData = validate.data;

    const newProduct = new ProductModel({
      name: productData.name,
      slug: productData.slug,
      category: productData.category,
      brand: productData.brand,
      productType: productData.productType,
      usageInstructions: productData.usageInstructions,
      material: productData.material,
      ageGroup: productData.ageGroup,
      description: encode(productData.description),
      status: productData.status,
      warranty: productData.warranty,
    });

    await newProduct.save();

    return response(true, 200, "Product added successfully.");
  } catch (error) {
    return catchError(error);
  }
}
