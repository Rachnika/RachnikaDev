"use client";
import Link from "next/link";
import React from "react";
import { BiCategory } from "react-icons/bi";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import useFetch from "@/hooks/useFetch";
import { ADMIN_CATEGORY_SHOW, ADMIN_CUSTOMERS_SHOW, ADMIN_PRODUCT_SHOW } from "@/routes/AdminPanelRoute";

const CountOverview = () => {

    const {data:countData}=useFetch('/api/dashboard/admin/count')

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-10 gap-5">
      <Link href={ADMIN_CATEGORY_SHOW}>
        <div className="flex items-center justify-between p-3 rounded-lg border shadow border-l-4 border-l-[#F57C00] bg-white dark:bg-card dark:border-gray-800 dark:border-l-[#F57C00]">
          <div>
            <h4 className="font-medium text-gray-500 dark:text-white">Total Categories</h4>
            <span className="text-xl font-bold">{countData?.data?.category || 0 }</span>
          </div>
          <div>
            <span className="w-12 h-12 border flex justify-center items-center rounded-full bg-[#F57C00] text-white  ">
              <BiCategory />
            </span>
          </div>
        </div>
      </Link>

      <Link href={ADMIN_PRODUCT_SHOW}>
        <div className="flex items-center justify-between p-3 rounded-lg border shadow border-l-4 border-l-[#3100f5] bg-white dark:bg-card dark:border-gray-800 dark:border-l-[#3100f5]">
          <div>
            <h4 className="font-medium text-gray-500 dark:text-white">Total Products</h4>
            <span className="text-xl font-bold">{countData?.data?.product || 0 }</span>
          </div>
          <div>
            <span className="w-12 h-12 border flex justify-center items-center rounded-full bg-[#3100f5] text-white  ">
              <IoShirtOutline />
            </span>
          </div>
        </div>
      </Link>

      <Link href={ADMIN_CUSTOMERS_SHOW}>
        <div className="flex items-center justify-between p-3 rounded-lg border shadow border-l-4 border-l-[#FFD700] bg-white dark:bg-card dark:border-gray-800 dark:border-l-[#FFD700]">
          <div>
            <h4 className="font-medium text-gray-500 dark:text-white">Total Customers</h4>
            <span className="text-xl font-bold">{countData?.data?.customer || 0 }</span>
          </div>
          <div>
            <span className="w-12 h-12 border flex justify-center items-center rounded-full bg-[#FFD700] text-white  ">
              <LuUserRound />
            </span>
          </div>
        </div>
      </Link>

      <Link href="">
        <div className="flex items-center justify-between p-3 rounded-lg border shadow border-l-4 border-l-[#4bd8cf] bg-white dark:bg-card dark:border-gray-800 dark:border-l-[#4bd8cf]">
          <div>
            <h4 className="font-medium text-gray-500 dark:text-white">Total Orders</h4>
            <span className="text-xl font-bold">10</span>
          </div>
          <div>
            <span className="w-12 h-12 border flex justify-center items-center rounded-full bg-[#4bd8cf] text-white  ">
              <MdOutlineShoppingBag />
            </span>
          </div>
        </div>
      </Link>

    </div>
  );
};

export default CountOverview;
