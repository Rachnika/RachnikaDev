import { WEBSITE_HOME } from "@/routes/WebsiteRoute";
import Link from "next/link";
import Logo from "./Logo";
import { FaRegWindowClose } from "react-icons/fa";


const Navbar = ({ isMobileMenu, setIsMobileMenu }) => {
  

  return (
    <div className="flex justify-between gap-20">
      <nav
        className={`lg:relative lg:w-auto lg:h-auto lg:top-0 lg:left-0 lg:p-0 bg-white fixed z-50 top-0 w-full h-screen transition-all ${
          isMobileMenu ? "left-0" : "-left-full"
        } `}
      >
        <div className="lg:hidden flex justify-between items-center bg-gray-50 py-3 border-b px-3 ">
          <Logo />

          <button type="button" onClick={() => setIsMobileMenu(false)}>
            <FaRegWindowClose
              size={25}
              className="text-gray-500 hover:text-primary cursor-pointer"
            />
          </button>
        </div>

        <ul className="lg:flex justify-between items-center gap-10 px-3">
          <li className="text-gray-600 hover:text-primary hover:font-semibold">
            <Link href={WEBSITE_HOME} className="block py-2">
              Home
            </Link>
          </li>

          <li className="text-gray-600 hover:text-primary hover:font-semibold">
            <Link href="" className="block py-2">
              Shop By Categoty
            </Link>
          </li>

          <li className="text-gray-600 hover:text-primary hover:font-semibold">
            <Link href="" className="block py-2">
              Shop By Brand
            </Link>
          </li>

          <li className="text-gray-600 hover:text-primary hover:font-semibold">
            <Link href="" className="block py-2">
              DIY Products
            </Link>
          </li>

          <li className="text-gray-600 hover:text-primary hover:font-semibold">
            <Link href="" className="block py-2">
              Gifting
            </Link>
          </li>

          <li className="text-gray-600 hover:text-primary hover:font-semibold">
            <Link href="" className="block py-2">
              Deal of the Day
            </Link>
          </li>

          <li className="text-gray-600 hover:text-primary hover:font-semibold">
            <Link href="" className="block py-2">
              New Arrivals
            </Link>
          </li>
        </ul>
      </nav>

      
    </div>
  );
};

export default Navbar;
