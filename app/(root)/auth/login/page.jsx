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
import { USER_DASHBOARD, WEBSITE_REGISTER, WEBSITE_RESETPASSWORD } from "@/routes/WebsiteRoute";
import axios from "axios";
import { showToast } from "@/lib/showToast";

import OTPVerification from "@/components/Application/OTPVerification";
import { useDispatch } from "react-redux";
import { login } from "@/store/reducer/authReducer";
import { useRouter, useSearchParams } from "next/navigation";
import { ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";


const LoginPage = () => {
  const dispatch=useDispatch()
  const searchParams=useSearchParams()
  const router=useRouter()
  const [loading, setLoading] = useState(false);
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [otpEmail, setOtpEmail] = useState();
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
    try {
      setLoading(true);
      // make API call to login user
      // Assuming the API endpoint is /api/auth/login
      const { data: loginResponse } = await axios.post(
        "/api/auth/login",
        values
      );
      if (!loginResponse.success) {
        throw new Error(loginResponse.message);
      }


      setOtpEmail(values.email);

      // Reset the form after successful registration
      form.reset();
      showToast("success", loginResponse.message);
    } catch (error) {
      // alert(error.message);
      // Show error toast
      showToast("error", error.message);
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };


  // handle OTP verification
  const handleOtpVerification = async (values) => {

    try {
      setOtpVerificationLoading(true);
      const { data: otpResponse } = await axios.post(
        "/api/auth/verify-otp",
        values
      );
      if (!otpResponse.success) {
        throw new Error(otpResponse.message);
      }
      setOtpEmail('');
      showToast("success", otpResponse.message);

      dispatch(login(otpResponse.data))

      if(searchParams.has('callback')){
        router.push(searchParams.get('callback'))

      }else{
        // set router admin or user
        otpResponse.data.role==='admin' ? router.push(ADMIN_DASHBOARD) : router.push(USER_DASHBOARD)
      }


    } catch (error) {
      showToast("error", error.message);
    } finally {
      setOtpVerificationLoading(false);
    }


  }

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
      {
        !otpEmail ? 
        <>
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
                  <Link
                    href={WEBSITE_REGISTER}
                    className="text-primary underline"
                  >
                    Create Account
                  </Link>
                </div>
              </div>

              <div className="text-center mt-3">
                <Link href={WEBSITE_RESETPASSWORD} className="text-primary underline">
                  Forgot Password?
                </Link>
              </div>
            </form>
          </Form>
        </div>
        
        </>
        :
        <OTPVerification email={otpEmail} onSubmit={handleOtpVerification} loading={otpVerificationLoading} />
      }


        
      </CardContent>
    </Card>
  );
};

export default LoginPage;
