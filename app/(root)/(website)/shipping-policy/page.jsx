"use client";

import { RETURN_REFUND_POLICY } from "@/routes/WebsiteRoute";

const ShippingPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 lg:px-32">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Shipping Policy
      </h1>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Processing Time
          </h2>
          <p>
            All orders are processed within <strong>1–3 business days</strong>{" "}
            (excluding Sundays and public holidays). During high demand
            (festivals, sales, or new launches), processing may take an extra{" "}
            <strong>2–4 business days</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            2. Shipping Methods & Delivery Time
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Standard Shipping (India):</strong> 5–7 business days.
            </li>
            <li>
              <strong>Express Shipping (India):</strong> 2–4 business days
              (extra charges apply).
            </li>
            <li>
              <strong>International Shipping:</strong> 7–14 business days
              depending on the destination.
            </li>
          </ul>
          <p className="mt-2 italic">
            *Delivery times may vary due to courier delays, weather, or
            unforeseen circumstances.*
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            3. Shipping Charges
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Orders above <strong>₹999</strong> qualify for{" "}
              <strong>Free Standard Shipping</strong> within India.
            </li>
            <li>
              Orders below ₹999 have a flat shipping fee of{" "}
              <strong>₹50–100</strong> (depending on location).
            </li>
            <li>
              International shipping charges are calculated at checkout.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            4. Order Tracking
          </h2>
          <p>
            Once shipped, you will receive a{" "}
            <strong>tracking number</strong> via email/SMS. You can track your
            package using the courier partner’s website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            5. Delayed / Lost Orders
          </h2>
          <p>
            If your order is delayed or lost, please contact our support at{" "}
            <a
              href="mailto:support@rachnika.com"
              className="text-blue-600 underline"
            >
              support@rachnika.com
            </a>
            . We will assist you with updates or initiate a replacement/refund
            as per our policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            6. Incorrect Address
          </h2>
          <p>
            Customers are responsible for providing the correct shipping
            address. Orders with incorrect addresses may be delayed or returned.
            Additional charges may apply for re-shipping.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            7. Returns & Exchanges
          </h2>
          <p>
            For details, please refer to our{" "}
            <a href={RETURN_REFUND_POLICY} className="text-blue-600 underline">
              Returns & Refunds Policy
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;
