"use client";
import { IoSearch } from "react-icons/io5";
import Cart from "./Cart";
import { VscAccount } from "react-icons/vsc";
import Link from "next/link";
import { USER_DASHBOARD, WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import userIcon from "@/public/assets/images/user.png";
import { HiMiniBars3 } from "react-icons/hi2";

const UserActions = ({ setIsMobileMenu }) => {
  const auth = useSelector((store) => store.authStore.auth);

  return (
    <div className="flex justify-between items-center gap-8">
      <button type="button">
        <IoSearch
          className="text-gray-500 hover:text-primary cursor-pointer"
          size={25}
        />
      </button>

      <Cart />

      {!auth ? (
        <Link href={WEBSITE_LOGIN}>
          <VscAccount
            className="text-gray-500 hover:text-primary cursor-pointer"
            size={25}
          />
        </Link>
      ) : (
        <Link href={USER_DASHBOARD}>
          <Avatar>
            <AvatarImage src={auth?.avatar?.url || userIcon.src} />
          </Avatar>
        </Link>
      )}

      {/* mobile button bars */}
      <button
        type="button"
        className="lg:hidden block"
        onClick={() => setIsMobileMenu(true)}
      >
        <HiMiniBars3
          size={25}
          className="text-gray-500 hover:text-primary cursor-pointer"
        />
      </button>
            
 


    </div>
  );
};

export default UserActions;
