import Link from 'next/link'
import React from 'react'
import { BiCategory } from "react-icons/bi";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlinePermMedia } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import { ADMIN_CATEGORY_ADD, ADMIN_COUPON_ADD, ADMIN_MEDIA_SHOW, ADMIN_PRODUCT_ADD } from '@/routes/AdminPanelRoute';

const QuickAdd = () => {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-10 gap-5 mt-10">
        <Link href={ADMIN_CATEGORY_ADD}>
            <div className='flex justify-between items-center p-3 rounded-lg shadow bg-white dark:bg-card bg-gradient-to-tr from-orange-300 via-orange-400 to-orange-500'>
                <h4 className='font-medium text-white dark:text-black'>Add Category</h4>
                <span className='w-12 h-12 border dark:border-orange-800 flex justify-center items-center rounded-full text-white'>
                    <BiCategory size={20} />
                </span>
            </div>
        </Link>

        <Link href={ADMIN_PRODUCT_ADD}>
            <div className='flex justify-between items-center p-3 rounded-lg shadow bg-white dark:bg-card bg-gradient-to-tr from-blue-300 via-blue-400 to-blue-500'>
                <h4 className='font-medium text-white dark:text-black'>Add Product</h4>
                <span className='w-12 h-12 border dark:border-blue-800 flex justify-center items-center rounded-full text-white'>
                    <IoShirtOutline size={20} />
                </span>
            </div>
        </Link>


        <Link href={ADMIN_COUPON_ADD}>
            <div className='flex justify-between items-center p-3 rounded-lg shadow bg-white dark:bg-card bg-gradient-to-tr from-green-300 via-green-400 to-green-500'>
                <h4 className='font-medium text-white dark:text-black'>Add Coupon</h4>
                <span className='w-12 h-12 border dark:border-green-800 flex justify-center items-center rounded-full text-white'>
                    <RiCoupon2Line size={20} />
                </span>
            </div>
        </Link>

        <Link href={ADMIN_MEDIA_SHOW}>
            <div className='flex justify-between items-center p-3 rounded-lg shadow bg-white dark:bg-card bg-gradient-to-tr from-red-300 via-red-400 to-red-500'>
                <h4 className='font-medium text-white dark:text-black'>Upload Media</h4>
                <span className='w-12 h-12 border dark:border-red-800 flex justify-center items-center rounded-full text-white'>
                    <MdOutlinePermMedia size={20} />
                </span>
            </div>
        </Link>

        
    </div>
  )
}

export default QuickAdd