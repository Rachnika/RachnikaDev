"use client";
import Link from "next/link";
import Logo from "./Logo";
import { ABOUTUS, CONTACT, COOKIE_POLICY, FAQS, PRIVACY_POLICY, RETURN_REFUND_POLICY, SHIPPING_POLICY, TERM_CONDITION, WEBSITE_LOGIN, WEBSITE_REGISTER } from "@/routes/WebsiteRoute";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="grid lg:grid-cols-6 md:grid-cols-2 grid-cols-1 gap-10 py-10 lg:px-32 px-4">
        {/* company details */}
        <div className="lg:col-span-1 md:col-span-2 col-span-1">
          <Logo/>
          <p className="text-gray-500 text-sm text-justify leading-relaxed">
            Rachnika is your trusted destination for creative, quality, and
            affordable products. From lifestyle to gifting, we bring innovation
            and joy to every purchase. Discover meaningful choices with Rachnika
            – where customer happiness always comes first.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="hover:text-primary hover:font-semibold"><Link href="">Shop</Link></li>
            <li className="hover:text-primary hover:font-semibold"><Link href={ABOUTUS}>About Us</Link></li>
            <li className="hover:text-primary hover:font-semibold"><Link href={CONTACT}>Contact</Link></li>
            <li className="hover:text-primary hover:font-semibold"><Link href="">Blog</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="hover:text-primary hover:font-semibold"><Link href={FAQS}>FAQs</Link></li>
            <li className="hover:text-primary hover:font-semibold"><Link href={SHIPPING_POLICY}>Shipping Policy</Link></li>
            <li className="hover:text-primary hover:font-semibold"><Link href={RETURN_REFUND_POLICY}>Returns & Refunds</Link></li>
            <li className="hover:text-primary hover:font-semibold"><Link href="">Track Order</Link></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Useful Links</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="hover:text-primary hover:font-semibold"><Link href="">Gift Cards</Link></li>
            <li className="hover:text-primary hover:font-semibold"><Link href="">Store Locator</Link></li>
            <li className="hover:text-primary hover:font-semibold"><Link href="">Affiliate Program</Link></li>
            <li className="hover:text-primary hover:font-semibold"><Link href="">Careers</Link></li>
          </ul>
        </div>

        {/* My Account */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">My Account</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="hover:text-primary hover:font-semibold"><Link href={WEBSITE_REGISTER}>Register</Link></li>
            <li className="hover:text-primary hover:font-semibold"><Link href={WEBSITE_LOGIN}>Login</Link></li>
            <li className="hover:text-primary hover:font-semibold"><Link href="">My Orders</Link></li>
            <li className="hover:text-primary hover:font-semibold"><Link href="">Wishlist</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="hover:text-primary hover:font-semibold"><Link href={PRIVACY_POLICY}>Privacy Policy</Link></li>
            <li className="hover:text-primary hover:font-semibold"><Link href={TERM_CONDITION}>Terms & Conditions</Link></li>
            <li className="hover:text-primary hover:font-semibold"><Link href={COOKIE_POLICY}>Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
