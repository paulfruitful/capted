import React from 'react'
import Image from 'next/image'
const Header = ({font}) => {
  return (
    <div className='flex w-full justify-center p-6 shadow-lg  bg-transparent'>
      <div className='flex'>
        <img src={'/sea.png'} className='w-[70px] h-[70px]'/>
        <span className={`text-gray-900 ${font.className} text-center py-3 lg:text-[37px] font-semibold`}>Jellyon</span>
      </div>
    </div>
  )
}

export default Header
