import { z } from "zod";

export const zSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password must be at most 64 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@$!%*?&)"
    ),

  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters long" })
    .max(150, { message: "Product name must be at most 150 characters long" })
    // Only allow letters, numbers, spaces, commas, apostrophes, hyphens, and ampersands
    .regex(/^[A-Za-z0-9\s,'&-]+$/, {
      message:
        "Product name can only contain letters, numbers, spaces, commas, apostrophes, hyphens, and ampersands",
    })
    // No multiple consecutive spaces
    .refine((val) => !/\s{2,}/.test(val), {
      message: "Product name cannot contain multiple consecutive spaces",
    })
    // No forbidden symbols often blocked by marketplaces
    .refine((val) => !/[!@#$%^*_=+<>?/:;\\[\]{}|~`]/.test(val), {
      message: "Product name contains forbidden special characters",
    })
    // Trim spaces at start/end
    .transform((val) => val.trim())
    // Capitalize first letter of each word
    .transform((val) => val.replace(/\b\w/g, (char) => char.toUpperCase())),

  brand: z.string().trim().optional(),

  productType: z.string().trim().optional(),

  usageInstructions: z
    .string()
    .max(2000, "Usage Instructions cannot exceed 2000 characters")
    .optional(),

  material: z.string().trim().optional(),

  ageGroup: z.string().trim().optional(),


  warranty: z.string().trim().optional(),


  status: z.enum(["active", "inactive", "draft"]).optional(),

  // product variant

  sku: z.string().trim().min(1, "SKU / Product Code is required"),

  color: z.string().trim().optional(),

  size: z.string().trim().optional(),

  pattern: z.string().trim().optional(),

  quantityVolume: z.string().trim().optional(), // e.g., "500ml"

  weight: z.string().trim().optional(),

  sellingPrice: z.number().min(0, "Selling price must be >= 0"),

  mrp: z.number().min(0, "MRP must be >= 0"),

  discountPercent: z.number().min(0).max(100).optional(),

  discountAmount: z.number().min(0).optional(),

  taxPercent: z.number().min(0).optional(), // GST %

  hsnCode: z.string().trim().optional(),

  stockQuantity: z.number().min(0, "Stock quantity must be >= 0"),

  stockStatus: z
    .enum(["in_stock", "out_of_stock"])
    .default("in_stock"),

  minOrderQty: z.number().min(1).default(1),

  shippingCharges: z.number().min(0).default(0),

  deliveryTime: z.string().trim().optional(),

  returnPolicy: z.string().trim().optional(),

  otp: z.string().regex(/^\d{6}$/, {
    message: "OTP must be a 6-digit number",
  }),

  _id: z.string().min(3, "id is required."),
  alt: z.string().min(3, "alt is required."),
  title: z.string().min(3, "Title is required."),
  slug: z.string().min(3, "Slug is required."),

  category: z.string().min(3, "Category is required."),


  // discountPercentage: z.union([
  //   z.number().positive("Expected positive value, received negative."),
  //   z
  //     .string()
  //     .transform((val) => Number(val))
  //     .refine((val) => !isNaN(val) && val >= 0, "Please enter a valid number."),
  // ]),
  description: z.string().min(3, "Discription is required."),
  media: z.array(z.string()),

  product: z.string().min(1, "Product is required"),
  
  code: z.string().min(1, "Code is required"),

  minShoppingAmount: z.union([
    z.number().positive("Expected positive value, received negative."),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "Please enter a valid number."),
  ]),

  validity: z.coerce.date(),
});
