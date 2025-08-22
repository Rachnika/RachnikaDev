"use client";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import { ADMIN_COUPON_SHOW, ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";
import { useState, useEffect } from "react";
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


const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_COUPON_SHOW, label: "Coupons" },
  { href: "", label: "Add Coupon" },
];

const AddCoupon = () => {
  const [loading, setLoading] = useState(false);


  
  const formSchema = zSchema.pick({
    code:true,
    discountPercent: true,
    minShoppingAmount:true,
    validity:true
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      discountPercent: "",
      minShoppingAmount: "",
      validity: "",
      
    },
  });

 

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const { data: response } = await axios.post(
        "/api/coupon/create",
        values
      );
      if (!response.success) {
        throw new Error(response.message);
      }

      form.reset();
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
          <h4 className="text-xl font-semibold">Add Coupon</h4>
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
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Code <span className="text-red-500">*</span>{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Code"
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
                  name="discountPercent"
                  
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Discount Percent{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter discount percent."
                          {...field}

                          onChange={(e) => {
                              const val = e.target.value;
                              field.onChange(
                                val === "" ? "" : e.target.valueAsNumber
                              );
                            }}
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
                  name="minShoppingAmount"
                  
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Minimum Shopping Amount
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter Minimum Shopping Amount"
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
                  name="validity"
                  
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Validity
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Enter Validity"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

             </div> 

              <div className="mb-3 mt-5">
                <ButtonLoading
                  loading={loading}
                  type="submit"
                  text="Add Coupon"
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

export default AddCoupon;
