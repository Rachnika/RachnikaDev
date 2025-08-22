"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "What is Rachnika?",
    answer:
      "Rachnika is a lifestyle and gifting brand offering unique DIY kits, creative stationery, and lifestyle products designed to inspire joy and creativity.",
  },
  {
    question: "How can I place an order?",
    answer:
      "You can browse our website, add your favorite products to the cart, and proceed to checkout. We offer multiple payment options including credit/debit cards, UPI, and wallets.",
  },
  {
    question: "Do you offer customization?",
    answer:
      "Yes! Many of our DIY kits and gifting products can be personalized to make your gifts even more special.",
  },
  {
    question: "What is the delivery timeline?",
    answer:
      "Orders are usually shipped within 1-2 business days and delivered within 5-7 working days depending on your location.",
  },
  {
    question: "What if I receive a damaged product?",
    answer:
      "In case of any damage, you can contact our support team within 48 hours of delivery. We will arrange a replacement or refund as per our return policy.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach us via email at support@rachnika.com or call us at +91-9876543210. Our support team is available Mon-Sat, 10 AM - 7 PM.",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-12 px-6 lg:px-32">
      <div className="max-w-5xl mx-auto text-gray-700">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <p className="mb-12 text-center text-base max-w-2xl mx-auto leading-relaxed">
          Got questions? We’ve got answers! Find everything you need to know about{" "}
          <span className="font-semibold">Rachnika</span> products, orders, and services.
        </p>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left text-lg font-medium text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {faq.question}
                <span className="text-gray-500 text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="p-5 text-gray-700 text-sm leading-relaxed border-t">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
