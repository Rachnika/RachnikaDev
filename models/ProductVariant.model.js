import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
    size: {
      type: String,
      trim: true,
    },
    pattern: {
      type: String,
      trim: true,
    },
    quantityVolume: {
      type: String, // e.g., "500ml", "2 pieces"
      trim: true,
    },
    weight: {
      type:String,
      trim:true,
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    mrp: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPercent: {
      type: Number,
      min: 0,
      max: 100,
    },
    discountAmount: {
      type: Number,
      min: 0,
    },
    taxPercent: {
      type: Number, // GST %
      min: 0,
    },
    hsnCode: {
      type: String,
      trim: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    stockStatus: {
      type: String,
      enum: ["in_stock", "out_of_stock"],
      default: "in_stock",
    },
    minOrderQty: {
      type: Number,
      min: 1,
      default: 1,
    },
    shippingCharges: {
      type: Number,
      min: 0,
      default: 0,
    },
    deliveryTime: {
      type: String, // e.g., "3-5 days"
      trim: true,
    },
    returnPolicy: {
      type: String,
      trim: true,
    },

    media: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        required: true,
      },
    ],

    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

const ProductVariantModel =
  mongoose.models.ProductVariant ||
  mongoose.model("ProductVariant", productVariantSchema, "productVariants");
export default ProductVariantModel;
