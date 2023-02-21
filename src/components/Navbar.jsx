import React from 'react'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {

  const navigate = useNavigate()
  return (
    <>
      <div className='flex text-white pb-2 border-b-2 border-[#232530]'>
        <img src={process.env.PUBLIC_URL + '/img/logo2.png'} alt='로고사진대체 예정' className='w-24' onClick={()=>{navigate('/')}}/>
        <p className='flex items-center justify-center text-2xl -ml-2'>Predict Bit</p>
      </div>
      </>
  )
}

export default Navbar