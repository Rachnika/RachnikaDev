"use client";

const ReturnsPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 lg:px-32">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Returns & Refunds Policy
      </h1>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Return Eligibility
          </h2>
          <p>
            We accept returns within <strong>7 days</strong> of delivery if the
            product is:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Damaged or defective on arrival</li>
            <li>Wrong item received</li>
            <li>
              Item is unused, in original packaging, and with all tags intact
            </li>
          </ul>
          <p className="mt-2 italic">
            *Personalized/customized items are <strong>non-returnable</strong>.*
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            2. Return Process
          </h2>
          <p>
            To initiate a return, contact us at{" "}
            <a
              href="mailto:support@rachnika.com"
              className="text-blue-600 underline"
            >
              support@rachnika.com
            </a>{" "}
            with your order ID, reason for return, and supporting images (if
            applicable).
          </p>
          <p className="mt-2">
            Once approved, we will share the return shipping instructions.
            Customers are responsible for return shipping costs unless the item
            was damaged/incorrect.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            3. Refunds
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Refunds are processed to the original payment method within{" "}
              <strong>7–10 business days</strong> after the returned item is
              received and inspected.
            </li>
            <li>
              If the original payment method is unavailable, store credit may be
              offered.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            4. Exchanges
          </h2>
          <p>
            We only replace items if they are defective, damaged, or the wrong
            item was sent. If you need an exchange, please mention it when
            contacting our support team.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            5. Non-Returnable Items
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Gift cards</li>
            <li>Personalized/custom-made items</li>
            <li>Clearance sale items</li>
            <li>Items without original packaging/tags</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            6. Cancellations
          </h2>
          <p>
            Orders can be cancelled within <strong>12 hours</strong> of purchase
            before they are processed. Once shipped, cancellation is not
            possible.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ReturnsPolicy;
