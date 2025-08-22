"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { showToast } from "@/lib/showToast";
import { zSchema } from "@/lib/zodSchema";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  // ✅ Define schema using your zSchema
  const formSchema = zSchema.pick({
    name: true,
    email: true,
    message: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const { data: response } = await axios.post("/api/contact", values);

      if (!response.success) {
        throw new Error(response.message);
      }

      form.reset();
      showToast("success", response.message);
    } catch (error) {
      showToast("error", error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left side - Company Info */}
      <div className="flex flex-col justify-center bg-gray-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Our Office</h2>
        <p className="mb-2 text-gray-700">
          <strong>Address:</strong><br />
          123 Creative Street, Sector 45<br />
          Gurugram, Haryana, India
        </p>
        <p className="mb-2 text-gray-700">
          <strong>Email:</strong> support@yourcompany.com
        </p>
        <p className="mb-2 text-gray-700">
          <strong>Phone:</strong> +91 9876543210
        </p>
        <p className="text-gray-700">
          <strong>Working Hours:</strong><br />
          Mon – Sat: 9:00 AM – 7:00 PM
        </p>
      </div>

      {/* Right side - Contact Form */}
      <Card className="rounded shadow-sm">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <h4 className="text-xl font-semibold">Contact Us</h4>
        </CardHeader>

        <CardContent className="pb-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Message <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="mt-5">
                <ButtonLoading
                  loading={loading}
                  type="submit"
                  text="Send Message"
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

export default ContactPage;
