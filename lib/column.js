import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Chip } from "@mui/material";
import dayjs from "dayjs";
import userIcon from '@/public/assets/images/user.png';

// category column
export const DT_CATEGORY_COLUMN = [
  {
    accessorKey: "name", // database field name
    header: "Category Name",
  },
  {
    accessorKey: "slug", // database field name
    header: "Slug",
  },
];

// product column
export const DT_PRODUCT_COLUMN = [
  {
    accessorKey: "name", // database field name
    header: "Product Name",
  },
  {
    accessorKey: "slug", // database field name
    header: "Slug",
  },
  {
    accessorKey: "category", // database field name
    header: "Category",
  },
  {
    accessorKey: "brand", // database field name
    header: "Brand",
  },
  {
    accessorKey: "productType", // database field name
    header: "Product Type",
  },
  {
    accessorKey: "usageInstructions", // database field name
    header: "Usage Instructions",
  },
  {
    accessorKey: "material", // database field name
    header: "Material",
  },
  {
    accessorKey: "warranty", // database field name
    header: "Warranty",
  },
  {
    accessorKey: "ageGroup", // database field name
    header: "Age Group",
  },
  {
    accessorKey: "status", // database field name
    header: "Status",
  },

];

// product variant column
export const DT_PRODUCT_VARIANT_COLUMN = [
  {
    accessorKey: "product", // database field name
    header: "Product Name",
  },
  {
    accessorKey: "color", // database field name
    header: "Color",
  },
  {
    accessorKey: "pattern", // database field name
    header: "Pattern",
  },
  {
    accessorKey: "quantityVolume", // database field name
    header: "Quantity/Volume",
  },
  {
    accessorKey: "weight", // database field name
    header: "Weight",
  },
  {
    accessorKey: "size", // database field name
    header: "Size",
  },
  {
    accessorKey: "sku", // database field name
    header: "SKU",
  },
  {
    accessorKey: "mrp", // database field name
    header: "MRP",
  },
  {
    accessorKey: "sellingPrice", // database field name
    header: "Selling Price",
  },
  {
    accessorKey: "discountPercent", // database field name
    header: "Discount Percent",
  },
  {
    accessorKey: "discountAmount", // database field name
    header: "Discount Amount",
  },
  {
    accessorKey: "taxPercent", // database field name
    header: "Tax Percent",
  },
  {
    accessorKey: "hsnCode", // database field name
    header: "HSN Code",
  },
  {
    accessorKey: "stockQuantity", // database field name
    header: "Stock Quantity",
  },
  {
    accessorKey: "stockStatus", // database field name
    header: "Stock Status",
  },
  {
    accessorKey: "minOrderQty", // database field name
    header: "Min.OrderQty",
  },
  {
    accessorKey: "shippingCharges", // database field name
    header: "Shipping Charges",
  },
  {
    accessorKey: "deliveryTime", // database field name
    header: "Delivery Time",
  },
  {
    accessorKey: "returnPolicy", // database field name
    header: "Return Policy",
  },
];

// Coupon column
export const DT_COUPON_COLUMN = [
  {
    accessorKey: "code", // database field name
    header: "Code",
  },
  {
    accessorKey: "discountPercentage", // database field name
    header: "Discount Percentage",
  },
  {
    accessorKey: "minShoppingAmount", // database field name
    header: "Min. Shopping Amount",
  },
  {
    accessorKey: "validity", // database field name
    header: "Validity",
    Cell: ({ renderedCellValue }) =>
      new Date() > new Date(renderedCellValue) ? (
        <Chip
          color="error"
          label={dayjs(renderedCellValue).format("DD/MM/YYYY")}
        />
      ) : (
        <Chip
          color="success"
          label={dayjs(renderedCellValue).format("DD/MM/YYYY")}
        />
      ),
  },
];


// Customers column
export const DT_CUSTOMERS_COLUMN = [
  {
    accessorKey: "avatar", // database field name
    header: "Avatar",
    Cell:({renderedCellValue})=>(
        <Avatar>
            <AvatarImage src={renderedCellValue?.url || userIcon.src} />
        </Avatar>
    )
  },
  {
    accessorKey: "name", // database field name
    header: "Name",
  },
  {
    accessorKey: "email", // database field name
    header: "Email",
  },
  {
    accessorKey: "phone", // database field name
    header: "Phone",
  },
  {
    accessorKey: "address", // database field name
    header: "Address",
  },
  {
    accessorKey : "isEmailVerified",
    header: "Is Verified",
    Cell:({renderedCellValue})=>(
        renderedCellValue ? <Chip color="success" label="Verified" /> : <Chip color="error" label="Not Verified" />
    )
  }
  
];


// review & rating  column
export const DT_REVIEW_COLUMN = [
  {
    accessorKey: "product", // database field name
    header: "Product",
  },
  {
    accessorKey: "user", // database field name
    header: "User",
  },
  {
    accessorKey: "title", // database field name
    header: "Title",
  },
  {
    accessorKey: "rating", // database field name
    header: "Rating",
  },
  {
    accessorKey: "review", // database field name
    header: "Review",
  },
]; 




