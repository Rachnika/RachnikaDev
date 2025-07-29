"use client";
import { Card, CardContent } from "@/components/ui/card";
import { use, useState, useEffect } from "react";
import axios from "axios";
import verfiedImage from "@/public/assets/images/verified.gif";
import unverifiedImage from "@/public/assets/images/verification-failed.gif";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WEBSITE_HOME } from "@/routes/WebsiteRoute";

const EmailVerification = ({ params }) => {
  const { token } = use(params);
  const [isVerified, setIsVerified] = useState(false);

  // This component is used to verify the email using the token
  useEffect(() => {
    // Function to verify the email using the token
    const verifyEmail = async () => {
      const { data: verificationResponse } = await axios.post(
        "/api/auth/verify-email",
        { token }
      );
      // Check if the verification was successful
      if (verificationResponse.success) {
        setIsVerified(true);
      }
    };
    // Call the verifyEmail function
    verifyEmail();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <Card className="w-[400px] shadow-xl border border-gray-200">
      <CardContent>
        {isVerified ? (
          <div>
            <div className="flex justify-center items-center">
              <Image
                src={verfiedImage.src}
                alt="Email Verified"
                width={verfiedImage.width}
                height={verfiedImage.height}
                className="h-[100px] w-auto"
                priority="true"
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold my-5 text-green-500">
                Email Verification Success!
              </h1>
              <Button asChild>
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-center items-center">
              <Image
                src={unverifiedImage.src}
                alt="Email un-verified"
                width={unverifiedImage.width}
                height={unverifiedImage.height}
                className="h-[100px] w-auto"
                priority="true"
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold my-5 text-red-500">
                Email Verification Failed!
              </h1>
              <Button asChild>
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
    </div>
  );
};

export default EmailVerification;
