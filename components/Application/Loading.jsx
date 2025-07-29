import React from 'react'
import loading from '@/public/assets/images/loading.svg'
import Image from 'next/image'

const Loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-start mt-12">
      <Image scr={loading.scr} height={80} weight={80} alt='loading' />
    </div>
  )
}

export default Loading
