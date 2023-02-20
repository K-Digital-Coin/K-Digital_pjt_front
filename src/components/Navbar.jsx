import React from 'react'
import Logo from '../img/logo2.png'
const Navbar = () => {
  return (
    <>
      <div className='flex text-white border-b-gray-400'>
        <img src={Logo} alt='로고사진' className='w-24'/>
        <p className='flex items-center justify-center text-2xl -ml-2'>Predict Bit</p>
      </div>
      </>
  )
}

export default Navbar