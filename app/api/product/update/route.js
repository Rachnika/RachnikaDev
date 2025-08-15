import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import ProductModel from "@/models/Product.model";
import { encode } from "entities";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");

    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized access.");
    }

    await connectDB();
    const payload = await request.json();
    const schema = zSchema.pick({
      _id: true,
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

    const validatedData = validate.data;

    const getProduct = await ProductModel.findOne({
      deletedAt: null,
      _id: validatedData._id,
    });

    if (!getProduct) {
      return response(false, 404, "Data not found.");
    }

    getProduct.name = validatedData.name;
    getProduct.slug = validatedData.slug;
    getProduct.category = validatedData.category;
    getProduct.brand = validatedData.brand;
    getProduct.productType = validatedData.productType;
    getProduct.usageInstructions = validatedData.usageInstructions;
    getProduct.material = validatedData.material;
    getProduct.ageGroup = validatedData.ageGroup;
    getProduct.description = encode(validatedData.description);
    getProduct.status = validatedData.status;
    getProduct.warranty = validatedData.warranty;

    await getProduct.save();

    return response(true, 200, "Product updated successfully.");
  } catch (error) {
    return catchError(error);
  }
}
