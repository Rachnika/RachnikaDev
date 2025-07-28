"use client";

import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/public/assets/images/Rachnika_Logo.png";
import Image from "next/image";
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
import Link from "next/link";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute"; 


const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  // define form schema using zod
  const formSchema = zSchema
  .pick({
    email: true,
    password: true,
    name: true,
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // handle form submission
  const handleRegisterSubmit = async (values) => {
    console.log("Form submitted with values:", values);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <Card className="w-[500px]">
      <CardContent>
        <div className="flex justify-center">
          <Image
            priority={true}
            src={Logo.src}
            width={Logo.width}
            height={Logo.height}
            alt="company logo"
            className="max-w-[150px]"
          />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-semibold">Create Account</h1>
          <p>Create new account by filling out the form below</p>
        </div>

        <div className="mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegisterSubmit)}>
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@gmail.com"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
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
                  text="Create Account"
                  className="w-full cursor-pointer"
                />
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <p>Already have an account ?</p>
                  <Link href={WEBSITE_LOGIN} className="text-primary underline">
                    Login
                  </Link>
                </div>
              </div>

              
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default RegisterPage
