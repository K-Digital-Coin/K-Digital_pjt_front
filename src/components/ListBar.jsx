import React, { useState } from 'react'

const ListBar = () => {

const [wonClick , setWonClick] = useState(0)
const [cClick, setcClick] = useState(0)


  return (
    <div className='row-span-3 w-full border-2 border-[#232530]'>
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
      <div className='mt-6 text-sm flex space-x-4 justify-between'>
        <p>한글명</p>
        <p>현재가</p>
        <p>전일대비</p>
        <p>거래대금</p>
      </div>
      {/* 코인여러개 */}
    </div>
  )
}

export default ListBar
