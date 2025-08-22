"use client";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 lg:px-32">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section>
          <p>
            At <strong>Rachnika</strong>, we value your trust and are committed
            to protecting your personal information. This Privacy Policy
            explains how we collect, use, and safeguard your data when you use
            our website and services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email, phone number,
              billing/shipping address.
            </li>
            <li>
              <strong>Payment Information:</strong> Processed securely by our
              payment gateway (we do not store card details).
            </li>
            <li>
              <strong>Usage Data:</strong> IP address, browser type, device
              info, and browsing behavior.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To process and deliver your orders</li>
            <li>To improve website functionality and user experience</li>
            <li>To send order updates, offers, and promotions</li>
            <li>To comply with legal or regulatory requirements</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            3. Sharing of Information
          </h2>
          <p>
            We do not sell or rent your personal information. Your data may only
            be shared with:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Trusted third-party partners (e.g., courier, payment gateways)</li>
            <li>Law enforcement agencies when required by law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            4. Data Security
          </h2>
          <p>
            We use secure encryption technologies and industry-standard measures
            to protect your personal information from unauthorized access,
            alteration, or misuse.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            5. Cookies
          </h2>
          <p>
            Our website uses cookies to enhance user experience and analyze
            traffic. You can manage cookie preferences in your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            6. Your Rights
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access, update, or delete your personal data</li>
            <li>Opt-out of promotional emails and SMS</li>
            <li>Request details about how your data is processed</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            7. Contact Us
          </h2>
          <p>
            For any privacy-related concerns, please contact us at{" "}
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

export default PrivacyPolicy;
