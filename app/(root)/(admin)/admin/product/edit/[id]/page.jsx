"use client";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_SHOW } from "@/routes/AdminPanelRoute";
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
import slugify from "slugify";
import { showToast } from "@/lib/showToast";
import axios from "axios";
import useFetch from "@/hooks/useFetch";
import Select from "@/components/Application/Select";
import Editor from "@/components/Application/Admin/Editor";
import { status } from "@/lib/productStatus";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_PRODUCT_SHOW, label: "Products" },
  { href: "", label: "Edit Product" },
];

const EditProduct = ({ params }) => {
  const { id } = use(params);

  const [loading, setLoading] = useState(false);
  const [categoryOption, setCategoryOption] = useState([]);
  const { data: getCategory } = useFetch(
    "/api/category?deleteType=SD&&size=10000"
  );
  const { data: getProduct, loading: getProductLoading } = useFetch(
    `/api/product/get/${id}`
  );

  useEffect(() => {
    if (getCategory && getCategory.success) {
      const data = getCategory.data;
      const options = data.map((cat) => ({ label: cat.name, value: cat._id }));
      setCategoryOption(options);
    }
  }, [getCategory]);

  const formSchema = zSchema.pick({
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

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: id,
      name: "",
      slug: "",
      category: "",
      brand: "",
      productType: "",
      usageInstructions: "",
      material: "",
      ageGroup: "",
      description: "",
      status: "",
      warranty: "",
    },
  });

  useEffect(() => {
    if (getProduct && getProduct.success) {
      const product = getProduct.data;
      form.reset({
        _id: product?._id,
        name: product?.name,
        slug: product?.slug,
        category: product?.category,
        brand: product?.brand,
        productType: product?.productType,
        usageInstructions: product?.usageInstructions,
        material: product?.material,
        ageGroup: product?.ageGroup,
        description: product?.description,
        status: product?.status,
        warranty: product?.warranty,
      });
    }
  }, [getProduct]);

  useEffect(() => {
    const name = form.getValues("name");
    if (name) {
      form.setValue("slug", slugify(name).toLowerCase());
    }
  }, [form.watch("name")]);

  const editor = (event, editor) => {
    const data = editor.getData();
    form.setValue("description", data);
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const { data: response } = await axios.put("/api/product/update", values);
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
          <h4 className="text-xl font-semibold">Edit Product</h4>
        </CardHeader>

        <CardContent className="pb-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <div className="">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Product Name <span className="text-red-500">*</span>{" "}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter Product name"
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
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Slug <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter Slug."
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
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Product Category{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            options={categoryOption}
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
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter Brand"
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
                    name="productType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Type</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter Product Type"
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
                    name="usageInstructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usage Instructions</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter Usage Instructions."
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
                    name="material"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Material</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter Material"
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
                    name="ageGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age Group</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter Age Group"
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
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Status <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            options={status}
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
                    name="warranty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Warranty</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter Warranty"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mb-5 md:col-span-2">
                  <FormLabel className="mb-2">
                    Description<span className="text-red-500">*</span>
                  </FormLabel>

                  {!getProductLoading && (
                    <Editor
                      onChange={editor}
                      initialData={form.getValues("description")}
                    />
                  )}

                  <FormMessage></FormMessage>
                </div>
              </div>

              <div className="mb-3 mt-5">
                <ButtonLoading
                  loading={loading}
                  type="submit"
                  text="Update Product"
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

export default EditProduct;
