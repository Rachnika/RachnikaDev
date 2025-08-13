"use client";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_VARIANT_SHOW } from "@/routes/AdminPanelRoute";
import { useState, useEffect, use } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { zSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "@/lib/showToast";
import axios from "axios";
import useFetch from "@/hooks/useFetch";
import Select from "@/components/Application/Select";
import MediaModal from "@/components/Application/Admin/MediaModal";
import Image from "next/image";
import { sizes } from "@/lib/productSize";



const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_PRODUCT_VARIANT_SHOW, label: "Product Variants" },
  { href: "", label: "Edit Product Variant" },
];

const EditProductVariant = ({params}) => {

  const {id}=use(params)

  const [loading, setLoading] = useState(false);
  // const [sizeOption,setSizeOption]=useState([])
  // const {data:getCategory}=useFetch('/api/category?deleteType=SD&&size=10000')
  const {data:getProduct , loading:getProductLoading}=useFetch(`/api/product-variant/get/${id}`)

// Media modal states
const [open,setOpen]=useState(false)
const [selectedMedia,setSelectedMedia]=useState([])


// const productVariant = ProductModel.findById(id)
//       .populate("product", "name"); // populate only the name field from product

// if(!productVariant){
//   showToast(false,404,"Product Variant is not found.")
// }


  const formSchema = zSchema.pick({
    _id:true,
    product: true,
    color: true,
    size: true,
    sku:true,
    mrp: true,
    sellingPrice: true,
    discountPercentage: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id:id,
      product: "",
      color: "",
      size: "",
      sku:"",
      mrp: "",
      sellingPrice: "",
      discountPercentage: "",
    },
  });

  useEffect(()=>{
    if(getProduct && getProduct.success){
      const product=getProduct.data
      form.reset({
      _id: product?._id,
      product: product?.product?.name ||"",
      size: product?.size,
      color: product?.color,
      sku: product?.sku,
      mrp: product?.mrp,
      sellingPrice: product?.sellingPrice,
      discountPercentage: product?.discountPercentage,


      })
      if(product.media){
         const media=product.media.map((media)=>({_id:media._id,url:media.secure_url}))
         setSelectedMedia(media)
      }

    }
  },[getProduct])


  // calculate discountPercentage

useEffect(()=>{
  const mrp=form.getValues('mrp') || 0
  const sellingPrice=form.getValues('sellingPrice') || 0
  if(mrp>0 && sellingPrice>0){
    const discountPercentage=((mrp-sellingPrice)/mrp)*100
  form.setValue('discountPercentage',Math.round(discountPercentage))
  }
  

},[form.watch('mrp'),form.watch('sellingPrice')])


  const onSubmit = async (values) => {
    setLoading(true);
    try {

      if(selectedMedia.length<=0){
        return showToast('error','Please select media.')
      }

      const mediaIds=selectedMedia.map(media=>media._id)
      values.media=mediaIds

      const { data: response } = await axios.put(
        "/api/product-variant/update",
        values
      );
      if (!response.success) {
        throw new Error(response.message);
      }

     
      showToast("success", response.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />

      <Card className="py-0 rounded shadow-sm ">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <h4 className="text-xl font-semibold">Edit Product Variant</h4>
        </CardHeader>

        <CardContent className="pb-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <div className="">
                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Product Name <span className="text-red-500">*</span>{" "}
                      </FormLabel>
                      <FormControl>
                        <div>
                        <Input
                          type="text"
                          placeholder="Enter Product name"
                          {...field}
                          readOnly
                        />
                        <p className="text-xs text-gray-500 mt-1">
    This field is read-only and cannot be edited.
  </p>  </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="">
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        SKU <span className="text-red-500">*</span>{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter SKU"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


              <div className="">
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Color <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Color"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <div className="">
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Size <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                        options={sizes}
                        selected={field.value}
                        setSelected={field.onChange}
                        isMulti={false}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="">
                <FormField
                  control={form.control}
                  name="mrp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        MRP <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter MRP"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="">
                <FormField
                  control={form.control}
                  name="sellingPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Selling Price <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter Selling Price."
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="discountPercentage"
                  
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Discount Percentage{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          readOnly
                          placeholder="Enter discount percentage."
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


              </div>

              <div className="md:col-span-2 border border-dashed rounded p-5 text-center">
                <MediaModal
                  open={open}
                  setOpen={setOpen}
                  selectedMedia={selectedMedia}
                  setSelectedMedia={setSelectedMedia}
                  isMultiple={true}
                />

                {
                  selectedMedia.length>0 
                  &&
                  <div className="flex justify-center items-center flex-wrap mb-3 gap-2">
                    {selectedMedia.map(media =>(
                      <div key={media._id} className="h-24 w-24 border">
                        <Image 
                        src={media.url}
                        height={100}
                        width={100}
                        alt=""
                        className="size-full object-cover"
                      
                        />
                      </div>
                    ))}
                  </div>
                }

                <div onClick={()=>setOpen(true)} className="bg-gray-50 dark:bg-card border w-[200px] mx-auto p-5 cursor-pointer">
                    <span className="font-semibold">Select Media</span>
                </div>


              </div>

              <div className="mb-3 mt-5">
                <ButtonLoading
                  loading={loading}
                  type="submit"
                  text="Update Product Variant"
                  className="cursor-pointer"
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProductVariant;
