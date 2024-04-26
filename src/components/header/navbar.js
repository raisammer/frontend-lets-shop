import React from 'react'
import { Search } from '@mui/icons-material'
import { useState, useEffect, useContext } from 'react'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Avatar from '@mui/material/Avatar'
import { NavLink } from 'react-router-dom'
import { LoginContext } from '../context/ContextProvider'
import { deepOrange, deepPurple } from '@mui/material/colors'
import MenuBar from './MenuBar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector, useDispatch } from 'react-redux'
import { SearchBar } from './SearchBar.js'

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const navigate = useNavigate('')
  const { account, setAccount } = useContext(LoginContext)

  console.log('haa bhai mai hi hu ', account)

  const getValidUser = async () => {
    try {
      const user = await fetch('/cartitems', {
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      const data = await user.json()
      if (user.status !== 201) {
        console.log('error in receiving the data ', data)
      } else {
        setAccount(data)
      }
    } catch (err) {
      console.log('Autenticated err when refreing ' + err.message)
    }
  }

  useEffect(() => {
    getValidUser()
  }, [])

  const logOut = async () => {
    try {
      const user = await fetch('/logout', {
        method: 'POST',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      const data = await user.json()
      if (user.status !== 201) {
        console.log('error in logging out ')
      } else {
        console.log('Logged Out successfully')
        setAccount(false)
        navigate('/')
        toast.success('Logout Successfully', {
          position: 'top-center',
          autoClose: 3000,
        })
      }
    } catch (err) {
      console.log('Error in logging out :((', err)
    }
  }

  return (
    <>
      <header>
        <navbar className='flex flex-row justify-around bg-slate-600 scroll-mt-40 '>
          <div className='sm:hidden'>
            <MenuBar />
          </div>
          <NavLink to='./' className='rounded-xl'>
            <img src='./logo.png' alt='logo' className='h-14 w-14' />
          </NavLink>

          <SearchBar />

          <div className=' flex sm:flex-row justify-between items-center gap-2'>
            <div className='check-up'>
              {!account ? (
                <NavLink
                  to='./signin'
                  className='hidden sm:hover:bg-slate-700 sm:text-black  sm:py-1 sm:px-2 sm:rounded sm:shadow-sm sm:transition duration-300 sm:ease-in-out '
                >
                  Sign In
                </NavLink>
              ) : (
                <NavLink
                  to='/buynow'
                  className='hidden sm:hover:bg-slate-700 sm:text-black  sm:py-1 sm:px-2 sm:rounded sm:shadow-sm sm:transition duration-300 sm:ease-in-out'
                >
                  Hii {account.fname}
                </NavLink>
              )}
            </div>

            {account ? (
              <NavLink
                to='/buynow'
                className='flex justify-center p-2  hover:bg-slate-700 text-black  py-1 px-2 rounded shadow-sm transition duration-300 ease-in-out'
              >
                <div className='items-center flex flex-row sm:justify-between'>
                  <IconButton aria-label='cart'>
                    <Badge badgeContent={account.carts.length} color='primary'>
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                  <p>Cart</p>
                </div>
                <ToastContainer />
              </NavLink>
            ) : (
              <NavLink
                to='/signin'
                className='flex justify-center p-2  hover:bg-slate-700 text-black  py-1 px-2 rounded shadow-sm transition duration-300 ease-in-out'
              >
                <div className='items-center flex flex-row sm:justify-between'>
                  <IconButton aria-label='cart'>
                    <Badge badgeContent={0} color='primary'>
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                  <p>Cart</p>
                </div>
                <ToastContainer closeOnClick />
              </NavLink>
            )}

            <div className='hidden sm:block sm:hover:bg-slate-700 sm:text-black  py-1 px-2 rounded shadow-sm transition duration-300 ease-in-out'>
              <Avatar
                sx={account ? { bgcolor: deepOrange[500] } : {}}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                {account ? account.fname[0].toUpperCase() : ''}
              </Avatar>
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <NavLink to={account ? '/buynow' : '/signin'}>
                  <MenuItem>My account</MenuItem>
                </NavLink>

                {account ? (
                  <div onClick={logOut}>
                    <MenuItem onClick={handleClose}>
                      <LogoutIcon className='gap-1 p-1' />
                      Logout
                    </MenuItem>
                  </div>
                ) : (
                  ''
                )}
              </Menu>
            </div>
          </div>
        </navbar>
      </header>
    </>
  )
}

export default Navbar
