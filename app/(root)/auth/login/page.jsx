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
import { WEBSITE_REGISTER } from "@/routes/WebsiteRoute";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  // define form schema using zod
  const formSchema = zSchema
    .pick({
      email: true,
    })
    .extend({
      password: z.string().min(3, "Password is required"),
    });

  // Importing the zod schema for form validation
  // define form schema using zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // handle form submission
  const handleLoginSubmit = async (values) => {
    console.log("Form submitted with values:", values);
  };

  return (
    <Card className="w-[400px]">
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
          <h1 className="text-3xl font-semibold">Login Into Account</h1>
          <p>Login into your account by filling out the form below</p>
        </div>

        <div className="mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLoginSubmit)}>
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

              <div className="mb-3">
                <ButtonLoading
                  loading={loading}
                  type="submit"
                  text="Login"
                  className="w-full cursor-pointer"
                />
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <p>Don't have an account ?</p>
                  <Link href={WEBSITE_REGISTER} className="text-primary underline">
                    Create Account
                  </Link>
                </div>
              </div>

              <div className="text-center mt-3">
                <Link href="" className="text-primary underline">
                  Forgot Password?
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
