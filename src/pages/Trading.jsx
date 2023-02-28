import React from 'react'
import CoinDetail from '../components/CoinDetail'
import ListBar from '../components/ListBar'

const Trading = () => {
  return (
    <div className='flex justify-between max-h-max'>
    <CoinDetail/>
    <ListBar/>
    </div>
  )
}

export default Trading