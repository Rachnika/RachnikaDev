"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { zSchema } from "@/lib/zodSchema";
import { showToast } from "@/lib/showToast";
import ButtonLoading from "@/components/Application/ButtonLoading";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";

const OTPVerification = ({ email, onSubmit, loading }) => {
  const [isResendOtp, setIsResendOtp] = useState(false);

  // ✅ Create schema for OTP + email
  const formSchema = zSchema.pick({
    otp: true,
    email: true,
  });

  // ✅ Set up form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      email: email,
    },
  });

  // ✅ Submit OTP
  const handleOtpVerification = async (values) => {
    onSubmit(values); // Pass to parent component or API
  };

  // ✅ Resend OTP handler
  const handleResendOtp = async () => {
    try {
      setIsResendOtp(true);
      const { data: resendOtpResponse } = await axios.post(
        "/api/auth/resend-otp",
        { email }
      );

      if (!resendOtpResponse.success) {
        throw new Error(resendOtpResponse.message);
      }

      showToast("success", resendOtpResponse.message);
    } catch (error) {
      showToast("error", error.message || "Something went wrong");
    } finally {
      setIsResendOtp(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOtpVerification)}>
          <div className="text-center mb-5">
            <h1 className="text-xl font-bold mb-2">
              Please Complete Your Verification
            </h1>
            <p className="text-md">
              We have sent a One-Time Password (OTP) to your registered email
              address. The OTP is valid for 10 minutes. Please enter the OTP
              below to verify your email address.
            </p>
          </div>

          <div className="mb-5 mt-5 flex justify-center items-center">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    One Time Password (OTP)
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="text-xl size-10"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-3">
            <ButtonLoading
              loading={loading}
              type="submit"
              text="Verify"
              className="w-full cursor-pointer"
            />

            <div className="text-center mt-5">
              <Button
                onClick={handleResendOtp}
                type="button"
                className="text-blue-500 cursor-pointer hover:underline"
                disabled={isResendOtp}
              >
                {isResendOtp ? "Resending..." : "Resend OTP"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OTPVerification;
