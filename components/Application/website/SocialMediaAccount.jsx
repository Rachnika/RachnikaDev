import { CiYoutube } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

const SocialMediaAccount = () => {
  return (
    <div className="flex gap-3 mt-2 ">
          <Link href="">
              <CiYoutube className="text-gray-500 hover:text-primary" size={25} />
          </Link>

          <Link href="">
              <FaLinkedinIn className="text-gray-500 hover:text-primary" size={25} />
          </Link>

          <Link href="">
              <FaInstagram className="text-gray-500 hover:text-primary" size={25} />
          </Link>

          <Link href="">
              <FaWhatsapp className="text-gray-500 hover:text-primary" size={25} />
          </Link>

          <Link href="">
              <CiFacebook className="text-gray-500 hover:text-primary" size={25} />
          </Link>

          <Link href="">
              <FaXTwitter className="text-gray-500 hover:text-primary" size={25} />
          </Link>
    </div>
  )
}

export default SocialMediaAccount