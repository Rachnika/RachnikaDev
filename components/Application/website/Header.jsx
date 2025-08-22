"use client";
import  { useState } from "react";
import Navbar from "./Navbar";
import Logo from "./Logo";
import UserActions from "./UserActions";

const Header = () => {

  const [isMobileMenu, setIsMobileMenu] = useState(false);

  return (
    <div className="bg-white border-b lg:px-32 px-4">
      <div className="flex justify-between items-center lg:py-5 py-3">
        <Logo />
        <Navbar isMobileMenu={isMobileMenu} setIsMobileMenu={setIsMobileMenu} />
        <UserActions setIsMobileMenu={setIsMobileMenu} />
      </div>
    </div>
  );
};

export default Header;
