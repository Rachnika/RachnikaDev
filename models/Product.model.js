import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 150,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    productType: {
      type: String,
      trim: true,
    },
    usageInstructions: {
      type: String,
      maxlength: 2000,
    },
    material: {
      type: String,
      trim: true,
    },
    warranty: {
      type: String,
      trim: true,
    },
    ageGroup: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active",
    },

    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ category: 1 });
const ProductModel =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema, "products");
export default ProductModel;
