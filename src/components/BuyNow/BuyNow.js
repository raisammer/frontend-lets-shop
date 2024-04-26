import React from 'react'
import { Divider } from '@mui/material'
import Option from './option'
import Button from '../button/button'
import SubTotal from './SubTotal'
import Right from './Right'
import { LoginContext } from '../context/ContextProvider'
import { useState, useContext, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BuyNow = () => {
  const { account, setAccount } = useContext(LoginContext)

  // delete Item
  const deleteItem = async (id) => {
    try {
      const res = await fetch(
        `https://backend-lets-shop.onrender.com/delete/${id}`,
        {
          method: 'DELETE',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      )
      const data = await res.json()
      if (res.status !== 201) {
        console.log('error in deleting the data ', data)
      } else {
        console.log('deleted successfully', data)
        setAccount(data)
        toast.success('Deleted Successfully', {
          position: 'top-right',
          autoClose: 3000,
        })
      }
    } catch (err) {
      console.log('err in deleting' + err.message)
      toast.fail(' Error Deleted Successfully', {
        position: 'top-right',
        autoClose: 3000,
      })
    }
  }
  console.log('hehe', account)
  return (
    <div className='bg-gray-100 items-center'>
      <div className='m-5  flex sm:flex-row flex-col gap-3'>
        <div className='sm:w-3/4  bg-white p-5 m-2'>
          <p className='text-3xl font-medium'> Shopping Cart </p>
          <p className='text-sky-700 mt-2 '>Select all items </p>
          <p className='sm:text-right sm:text-gray-500 sm:mt-1 hidden sm:block'>
            {' '}
            Price
          </p>
          <Divider></Divider>
          <div className=' flex flex-col gap-2 m-1'>
            {account &&
              account.carts.map((item) => {
                return (
                  <>
                    <div className='flex sm:flex-row flex-col mt-2'>
                      <div className='m-4 sm:w-[25%] w-full flex justify-center'>
                        <img
                          src={item.url}
                          alt={item.title ? item.title.shortTitle : ''}
                          className=''
                        />
                      </div>
                      <div className='p-4 m-2 sm:w-[60%] w-full flex sm:flex-col flex-row justify-between'>
                        <div>
                          <p className='text-2xl font-medium m-1'>
                            {item.title.longTitle}
                          </p>
                          <p className='text-2xl font-medium m-1'>
                            {item.title ? item.title.shortTitle : ''}
                          </p>
                          <p className='text-darkbrown m-1'>
                            {' '}
                            Usually Dispatched in 8 Days
                          </p>
                          <p className='text-gray-500 m-1 mb-5'>
                            {' '}
                            Eligible for free shipping
                          </p>
                        </div>
                        <Divider className='hidden sm:block'></Divider>
                        <div className=' m-2 mt-4 flex sm:flex-row flex-col sm:justify-around gap-2 items-center'>
                          <button className='hover:bg-slate-200  border-slate-500 border-2 rounded-sm'>
                            <Option></Option>
                          </button>
                          <button
                            className='text-sky-600'
                            onClick={() => deleteItem(item._id)}
                          >
                            Delete
                          </button>
                          <a href='' className='text-sky-600 '>
                            Save or Later
                          </a>
                          <a
                            href=''
                            className='sm:text-sky-600 hidden sm:block '
                          >
                            See More Like This
                          </a>
                        </div>
                      </div>
                      <p className='m-1 sm:m-4 text-xl font-medium inline sm:text-right text-center sm:mt-8'>
                        <span className='sm:hidden'>Price: </span> ₹{' '}
                        {item.price ? item.price.cost : 0}
                      </p>
                    </div>
                    <Divider />
                  </>
                )
              })}
          </div>
          <SubTotal
            className='sm:text-right'
            items={account && account.carts}
          ></SubTotal>
        </div>
        <div className='flex flex-col sm:w-1/5 m-2 gap-3'>
          <Right items={account && account.carts}></Right>
        </div>
      </div>
      <ToastContainer closeOnClick={true} />
    </div>
  )
}

export default BuyNow
