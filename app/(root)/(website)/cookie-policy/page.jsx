"use client";

const CookiePolicy = () => {
  return (
    <section className="bg-gray-50 py-12 px-6 lg:px-32">
      <div className="max-w-6xl mx-auto text-gray-700">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h2>

        <p className="mb-6 text-base leading-relaxed">
          This Cookie Policy explains how <span className="font-semibold">Rachnika</span> uses cookies and similar technologies to recognize you when you visit our website, interact with our content, or use our services. It explains what these technologies are, why we use them, and your rights to control our use of them.
        </p>

        {/* What Are Cookies */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">What Are Cookies?</h3>
          <p className="text-base leading-relaxed">
            Cookies are small text files stored on your device when you visit a website. They are widely used to make websites work more efficiently, provide better user experiences, and deliver personalized content and ads.
          </p>
        </div>

        {/* Why We Use Cookies */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Why We Use Cookies</h3>
          <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
            <li>To ensure the website functions properly.</li>
            <li>To remember your preferences and settings.</li>
            <li>To improve the performance and security of our site.</li>
            <li>To analyze traffic and user behavior for better services.</li>
            <li>To deliver relevant marketing and advertising.</li>
          </ul>
        </div>

        {/* Types of Cookies */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Types of Cookies We Use</h3>
          <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
            <li><span className="font-medium">Essential Cookies:</span> Required for the operation of our website.</li>
            <li><span className="font-medium">Performance Cookies:</span> Help us understand how visitors use our site.</li>
            <li><span className="font-medium">Functionality Cookies:</span> Remember choices you make for a more personalized experience.</li>
            <li><span className="font-medium">Targeting/Advertising Cookies:</span> Used to deliver ads relevant to your interests.</li>
          </ul>
        </div>

        {/* Managing Cookies */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Managing Cookies</h3>
          <p className="text-base leading-relaxed">
            You can accept, reject, or delete cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.
          </p>
        </div>

        {/* Updates */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Updates to This Policy</h3>
          <p className="text-base leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business operations. We encourage you to review this page periodically.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Us</h3>
          <p className="text-base leading-relaxed">
            If you have any questions about our Cookie Policy, please contact us at:  
            <br />
            <span className="font-medium">Email:</span> support@rachnika.com  
          </p>
        </div>
      </div>
    </section>
  );
};

export default CookiePolicy;
