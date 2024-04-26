import { NavLink } from 'react-router-dom'
import React, { useState, useContext } from 'react'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { LoginContext } from '../context/ContextProvider'
import { Divider } from '@mui/material'
import { deepOrange, deepPurple } from '@mui/material/colors'
import Avatar from '@mui/material/Avatar'
import { useNavigate } from 'react-router'

const MenuBar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { account, setAccount } = useContext(LoginContext)
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const navigate = useNavigate('')
  const logOut = async () => {
    try {
      const user = await fetch(
        'https://backend-lets-shop.onrender.com/logout',
        {
          method: 'POST',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      )
      const data = await user.json()
      if (user.status !== 201) {
        console.log('error in logging out ')
      } else {
        console.log('Logged Out successfully')
        setAccount(false)
        navigate('/')
        alert('Logged Out Successfully')
      }
    } catch (err) {
      console.log('Error in logging out :((', err)
    }
  }
  return (
    <div className='relative'>
      <button
        className='lg:hidden block text-gray-100 hover:text-gray-900 focus:text-gray-900 focus:outline-none'
        onClick={toggleMenu}
      >
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ ml: 1 }}
        >
          <MenuIcon />
        </IconButton>
      </button>
      <div
        className={`fixed lg:hidden top-0 left-0 h-full bg-gray-800 bg-opacity-25 transition-opacity ${
          showMenu ? 'opacity-100 w-1/2' : 'opacity-0 w-0'
        }`}
        onClick={toggleMenu}
      ></div>
      <div
        className={`fixed lg:hidden top-0 left-0 h-full w-1/2 bg-white shadow-lg transform transition-transform z-50 ${
          showMenu ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='px-4 py-2 flex flex-col gap-1'>
          <div className='flex justify-center bg-slate-600 hover:bg-slate-700 p-1 gap-2 items-center'>
            <Avatar
              onClick={toggleMenu}
              sx={account ? { bgcolor: deepOrange[500] } : {}}
            >
              {account ? account.fname[0].toUpperCase() : ''}
            </Avatar>
            {account ? (
              <span className='text-black items-center'>
                Hello {account.fname.toUpperCase()} !!!
              </span>
            ) : (
              ''
            )}
          </div>
          <button
            onClick={toggleMenu}
            className='block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded items-start'
          >
            <KeyboardBackspaceIcon />
          </button>
          <NavLink
            to='/'
            onClick={toggleMenu}
            className='block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded'
          >
            Home
          </NavLink>
          <NavLink
            to={account ? '/buynow' : '/signup'}
            onClick={toggleMenu}
            className='block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded'
          >
            My Orders
          </NavLink>
          <NavLink
            to={account ? '/buynow' : '/signup'}
            onClick={toggleMenu}
            className='block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded'
          >
            Profile
          </NavLink>
          <Divider className='p-1' />
          <NavLink
            to='/'
            onClick={toggleMenu}
            className='block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded'
          >
            Today's Deal
          </NavLink>
          <NavLink
            to='/'
            onClick={toggleMenu}
            className='block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded'
          >
            Premium Offers
          </NavLink>
          <Divider className='p-1' />
          <NavLink
            to='#'
            onClick={toggleMenu}
            className='block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded'
          >
            Settings & privacy
          </NavLink>
          <NavLink
            to='/Signin'
            onClick={toggleMenu}
            className='block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded'
          >
            Sign In
          </NavLink>
          {account ? (
            <NavLink
              onClick={logOut}
              to='/'
              className='block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded'
            >
              Sign Out
            </NavLink>
          ) : (
            <NavLink
              to='/signup'
              onClick={toggleMenu}
              className='block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded'
            >
              Sign Up
            </NavLink>
          )}
        </div>
      </div>
    </div>
  )
}

export default MenuBar
