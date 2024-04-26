import React from 'react'
import { NavLink } from 'react-router-dom'

const newNavBar = () => {
  return (
    <>
      <header>
        <div
          className='hidden sm:flex sm:flex-row sm:justify-around sm:bg-slate-900 text-white texl-xl'
        >
          <NavLink to='/'>
            ALL
          </NavLink>
          <a href='' className='Mobile'>
            Mobile
          </a>
          <a href='' className='BestSeller'>
            BestSeller
          </a>
          <a href='' className='Fashion'>
            Fashion
          </a>
          <a href='' className='Customer-services'>
            Customer-services
          </a>
          <a href='' className='Electronics'>
            Electronics
          </a>
          <a href='' className='Dresses'>
            Dresses
          </a>
          <a href='' className='Todays Deal'>
            Todays Deal
          </a>
        </div>
      </header>
    </>
  )
}
export default newNavBar
