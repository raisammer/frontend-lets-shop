import React from 'react'
import { NavLink } from 'react-router-dom'

const footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='items-center'>
      <div
        className='flex flex-row justify-around gap-3 p-5  bg-slate-700 '
      >
        <div className='flex flex-col text-white gap-1'>
          <h3 className='font-bold'> Get to Know Us</h3>
          <a href='#'>About Us</a>
          <a href='#'>Carrers</a>
          <a href='#'>Press Releases</a>
          <a href='#'>Lets-shop-Cares</a>
        </div>
        <div
          className='flex flex-col  text-white gap-1'
        >
          <h3 className='font-bold'> Connect with Us</h3>
          <a href='#'>Facebook</a>
          <a href='#'>Twitter</a>
          <a href='#'>Instagram</a>
        </div>
        <div
          className='flex flex-col text-white gap-1'
        >
          <h3 className='font-bold'> Make Money with Us</h3>
          <a href='#'>Facebook</a>
          <a href='#'>Twitter</a>
          <a href='#'>Instagram</a>
        </div>
      </div>
      <div className='bg-slate-800'>
        <NavLink to='/'>
          <div className='flex justify-center p-2'>
            <img src='./logo.png' alt='' className='h-12 w-12 items-center' />
          </div>
        </NavLink>
        <h6 className='text-white  text-center m-2'>
          Conditions of Use & Sale &nbsp; &nbsp;&nbsp; Privacy Notice &nbsp;
          &nbsp;&nbsp; Interest-Based Ads &nbsp; &nbsp;&nbsp; © 1996-{year},
          Lets-shop.com, Inc. or its affiliates
        </h6>
      </div>
    </footer>
  )
}

export default footer
