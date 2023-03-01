import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Paper } from '@mui/material'
import {TableVirtuoso} from 'react-virtuoso'

const ListBar = () => {

const [wonClick , setWonClick] = useState(0)
const [cClick, setcClick] = useState(0)
const [coinList , setCoinList] = useState([])

useEffect(()=>{
   (async ()=>{
   const coins = await axios
    .get('https://api.upbit.com/v1/market/all')
    .then((result)=>{
      setCoinList(result.data)})
      console.log(coinList)
    .catch((error)=>console.log(error))
  })()
},[])
     


  return (
    <div className=' hidden border-2 border-[#232530] lg:w-2/6 h-screen xs:hidden md:hidden sm:hidden lg:block xl:block '>
      {/* 선택창 */}
        <div className='flex space-x-6 justify-center'>        
        <button className={`${wonClick === 1 ? "border-b-2 border-red-400" : null}`}
        onClick={()=> {setWonClick(1)
                       setcClick(0)}}
        >원화거래</button>
        <button className={`${cClick === 1 ? "border-b-2 border-blue-400" : null}`}
        onClick={()=>{setcClick(1)
                     setWonClick(0)}}
        >
          보유코인</button>
        </div>

      {/* 선택창 */}
      {/* <div className='mt-6 text-sm flex space-x-4 justify-between'>
        <p className="hover:bg-slate-500">한글명</p>
        <p className="hover:bg-slate-500">현재가</p>
        <p className="hover:bg-slate-500">전일대비</p>
        <p className="hover:bg-slate-500">거래대금</p>
      </div>
      {/* 코인여러개 */}
      <div className='text-sm flex'>
        </div> 
       
    </div>
  )
}

export default ListBar
