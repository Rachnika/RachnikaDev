import { WEBSITE_HOME } from '@/routes/WebsiteRoute'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/public/assets/images/Rachnika_Logo.png';

const Logo = () => {
  return (
    <Link href={WEBSITE_HOME}>
        <Image 
        src={logo}
        width={283}
        height={146}
        alt='company-logo'
        className='lg:w-20 w-16'
        />
    </Link>
  )
}

export default Logo