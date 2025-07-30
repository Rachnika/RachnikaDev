"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { z } from "zod";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import axios from "axios";
import { showToast } from "@/lib/showToast";
import { useRouter } from "next/navigation";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";

const UpdatePassword = ({email}) => {

 const router=useRouter()
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  // define form schema using zod
  const formSchema = zSchema
    .pick({
      password: true,
      email:true
    })
    .extend({
      confirmPassword: z.string().min(1, "Confirm Password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password and Confirm Password must be the same.",
      path: ["confirmPassword"],
    });

  // Importing the zod schema for form validation
  // define form schema using zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email:email,
      password: "",
      confirmPassword: "",

    },
  });

  // handle form submission
  const handlePasswordUpdate = async (values) => {
    try {
      setLoading(true);
      // make API call to register user
      // Assuming the API endpoint is /api/auth/register
      const { data: passwordUpdate } = await axios.put(
        "/api/auth/reset-password/update-password",
        values
      );
      if (!passwordUpdate.success) {
        throw new Error(passwordUpdate.message);
      }
      // Reset the form after successful registration
      form.reset();
      // Show success toast
      showToast("success", passwordUpdate.message);

      router.push(WEBSITE_LOGIN)

    } catch (error) {
      // alert(error.message);
      // Show error toast
      showToast("error", error.message);
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
        <div>
          

          <div className="text-center">
            <h1 className="text-3xl font-semibold">Update Password</h1>
            <p>Create new Password by filling out the form below</p>
          </div>

          <div className="mt-5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handlePasswordUpdate)}>
                
                <div className="mb-5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Password </FormLabel>
                        <FormControl>
                          <Input
                            type={showPassword ? "password" : "text"}
                            placeholder="***********"
                            {...field}
                          />
                        </FormControl>
                        <button
                          className="absolute top-1/2 right-2 cursor-pointer"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mb-5">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Confirm Password </FormLabel>
                        <FormControl>
                          <Input
                            type={showConfirmPassword ? "password" : "text"}
                            placeholder="***********"
                            {...field}
                          />
                        </FormControl>
                        <button
                          className="absolute top-1/2 right-2 cursor-pointer"
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <FaRegEyeSlash />
                          ) : (
                            <FaRegEye />
                          )}
                        </button>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mb-3">
                  <ButtonLoading
                    loading={loading}
                    type="submit"
                    text="Update Password"
                    className="w-full cursor-pointer"
                  />
                </div>

                
              </form>
            </Form>
          </div>
        </div>
    </div>
  );
};

export default UpdatePassword;
