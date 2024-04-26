import React from 'react'
import Button from '../button/button'
import SubTotal from './SubTotal'
const Right = ({items}) => {
  return (
    <div>
      <div className='bg-white'>
        <img
          src='https://cdn2.nutrabay.com/images/purchase-protection.svg'
          alt=''
          className=''
        />
      </div>
      <div className='pt-4 pb-4 pl-3 pr-3 bg-white '>
        <p className='text-sky-500'>Your order is eligible for free delivery</p>
        <p className='text-slate-500'>
          Select this option at checkout .Details
        </p>
        <SubTotal className='text-center mt-8 mb-3' items={items}></SubTotal>
        <Button
          className='w-full text-center mt-3 mb-3'
          text='Proceed to Buy'
        ></Button>
        <button className='rounded-md border-2 border-slate-500 p-2 w-full font-medium'>
          Emi Available
        </button>
      </div>
    </div>
  )
}

export default Right
