"use client";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 lg:px-32">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Terms & Conditions
      </h1>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section>
          <p>
            Welcome to <strong>Rachnika</strong>. By accessing or using our
            website and services, you agree to comply with the following Terms
            & Conditions. Please read them carefully before placing an order.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Use of Website
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You must be at least 18 years old to make purchases on our
              website.
            </li>
            <li>
              You agree not to misuse the website for fraudulent, harmful, or
              illegal activities.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            2. Product Information
          </h2>
          <p>
            We strive to provide accurate product descriptions and images.
            However, colors, sizes, or materials may slightly vary due to
            lighting, screen resolution, or availability.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            3. Pricing & Payment
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All prices are listed in INR (₹) unless stated otherwise.</li>
            <li>
              Payment must be made through our secure payment gateways. We do
              not store sensitive card details.
            </li>
            <li>
              Rachnika reserves the right to change prices without prior notice.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            4. Shipping & Delivery
          </h2>
          <p>
            Orders are processed and shipped as per our{" "}
            <a
              href="/shipping-policy"
              className="text-blue-600 underline"
            >
              Shipping Policy
            </a>
            . Delivery times may vary based on location and courier partner.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            5. Returns & Refunds
          </h2>
          <p>
            Our{" "}
            <a
              href="/returns-policy"
              className="text-blue-600 underline"
            >
              Returns Policy
            </a>{" "}
            governs all exchanges, cancellations, and refunds.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            6. Intellectual Property
          </h2>
          <p>
            All content on this website, including text, images, logos, and
            designs, is the property of Rachnika and cannot be used without
            prior written consent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            7. Limitation of Liability
          </h2>
          <p>
            Rachnika shall not be liable for any indirect, incidental, or
            consequential damages arising from the use of our website, products,
            or services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            8. Changes to Terms
          </h2>
          <p>
            Rachnika reserves the right to update these Terms & Conditions at
            any time. Continued use of our website implies acceptance of the
            revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            9. Contact Us
          </h2>
          <p>
            If you have any questions about these Terms & Conditions, please
            contact us at{" "}
            <a
              href="mailto:support@rachnika.com"
              className="text-blue-600 underline"
            >
              support@rachnika.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
