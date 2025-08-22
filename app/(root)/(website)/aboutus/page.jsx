"use client";
import React from "react";
import Image from "next/image";
// import directorImage from '@/public/assets/Rohit_pic.jpeg'

const AboutUs = () => {
  return (
    <section className="bg-gray-50 py-12 px-6 lg:px-32">
      <div className="max-w-6xl mx-auto text-gray-700">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">About Us</h2>
        <p className="mb-8 text-base leading-relaxed">
          At <span className="font-semibold">Rachnika</span>, we bring creativity,
          joy, and meaning into everyday life. From{" "}
          <span className="font-medium">lifestyle products to gifting and DIY kits</span>, 
          our goal is to provide customers with{" "}
          <span className="font-medium">quality, affordable, and innovative choices</span>{" "}
          that inspire happiness and self-expression.
        </p>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
            <p className="text-base leading-relaxed">
              To <span className="font-medium">empower creativity</span> and spread happiness 
              with products that combine <span className="font-medium">quality, affordability, 
              and innovation</span>.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Vision</h3>
            <p className="text-base leading-relaxed">
              To become the <span className="font-medium">most trusted lifestyle and gifting brand</span>, 
              known for <span className="font-medium">customer happiness and creativity worldwide</span>.
            </p>
          </div>
        </div>

        {/* Director's Message with Gradient Background */}
        <div className="bg-gradient-to-r from-primary/10 via-white to-primary/10 shadow-lg rounded-2xl p-6 border-l-4 border-primary flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Director Image */}
          <div className="flex-shrink-0">
            <Image
              src="/assets/images/Rohit_pic.jpeg" // replace with actual image path
              alt="Director of Rachnika"
              width={150}
              height={150}
              className="rounded-full object-cover shadow-md border-4 border-white"
            />
          </div>

          {/* Message */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Director’s Message</h3>
            <p className="italic text-base leading-relaxed mb-4 text-gray-800">
              "At Rachnika, we don’t just create products—we create experiences.
              Every item we offer is designed with love, care, and creativity to bring joy
              to our customers’ lives. Our vision is to make Rachnika a global name where
              <span className="font-medium"> trust, quality, and innovation </span> meet."
            </p>
            <p className="font-semibold text-gray-900">— Rohit Kumar, Director of Rachnika</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
