"use client";
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { FiSearch } from "react-icons/fi";
import SearchModel from './SearchModel';

const AdminSearch = () => {

  const [open,setOpen]=useState(false)

  return (
    <div className='md:w-[350px]'>
        <div className='flex justify-between items-center relative'>
            <Input 
                readOnly
                className="rounded-full cursor-pointer"
                placeholder="Search anything..."
                onClick={()=>setOpen(true)}
            />

            <button type='button' className='absolute right-3 cursor-default'>
                <FiSearch />  
            </button>
        </div>

        <SearchModel open={open} setOpen={setOpen} /> 
    </div>
  )
}

export default AdminSearch