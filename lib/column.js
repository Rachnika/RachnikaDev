import { Chip } from "@mui/material"
import dayjs from "dayjs"

// category column
export const DT_CATEGORY_COLUMN=[
    {
        accessorKey:'name', // database field name 
        header:'Category Name',
    },
    {
        accessorKey:'slug', // database field name 
        header:'Slug',
    },
]

// product column
export const DT_PRODUCT_COLUMN=[
    {
        accessorKey:'name', // database field name 
        header:'Product Name',
    },
    {
        accessorKey:'slug', // database field name 
        header:'Slug',
    },
    {
        accessorKey:'category', // database field name 
        header:'Category',
    },
    {
        accessorKey:'mrp', // database field name 
        header:'MRP',
    },
    {
        accessorKey:'sellingPrice', // database field name 
        header:'Selling Price',
    },
    {
        accessorKey:'discountPercentage', // database field name 
        header:'Discount Percentage',
    },
]

// product variant column
export const DT_PRODUCT_VARIANT_COLUMN=[
    {
        accessorKey:'product', // database field name 
        header:'Product Name',
    },
    {
        accessorKey:'color', // database field name 
        header:'Color',
    },
    {
        accessorKey:'size', // database field name 
        header:'Size',
    },
    {
        accessorKey:'sku', // database field name 
        header:'SKU',
    },
    {
        accessorKey:'mrp', // database field name 
        header:'MRP',
    },
    {
        accessorKey:'sellingPrice', // database field name 
        header:'Selling Price',
    },
    {
        accessorKey:'discountPercentage', // database field name 
        header:'Discount Percentage',
    },
]

// Coupon column
export const DT_COUPON_COLUMN=[
    {
        accessorKey:'code', // database field name 
        header:'Code',
    },
    {
        accessorKey:'discountPercentage', // database field name 
        header:'Discount Percentage',
    },
    {
        accessorKey:'minShoppingAmount', // database field name 
        header:'Min. Shopping Amount',
    },
    {
        accessorKey:'validity', // database field name 
        header:'Validity',
        Cell:({renderedCellValue}) => (
             new Date() > new Date(renderedCellValue) ? <Chip color="error" label={dayjs(renderedCellValue).format('DD/MM/YYYY')} /> : <Chip color="success" label={dayjs(renderedCellValue).format('DD/MM/YYYY')} />
        ),
    },
    
]