import React from 'react'
import { Divider } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from '../button/button'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SignUp = () => {
  const [userData, setUserData] = useState({
    fname: '',
    email: '',
    mobile: '',
    password: '',
    cpassword: '',
  })
  const redirect = useNavigate()
  const addData = (e) => {
    const { name, value } = e.target
    setUserData(() => {
      return {
        ...userData,
        [name]: value,
      }
    })
  }

  const sendData = async (e) => {
    e.preventDefault()
    try {
      const { fname, email, mobile, password, cpassword } = userData
      const res = await fetch('/register', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          fname,
          email,
          mobile,
          password,
          cpassword,
        }),
      })

      const data = await res.json()
      if (res.status === 201) {
        console.log('Successfull')

        setUserData({
          ...userData,
          fname: '',
          email: '',
          password: '',
          cpassword: '',
          mobile: '',
        })

        toast.success('Registration Successfull', {
          position: 'top-right',
          autoClose: 2500,
        })
        // Redirect to the sign-in page after a delay
        const redirectToSignIn = async () => {
          await new Promise((resolve) => setTimeout(resolve, 3000)) // Delay for 2 seconds
          redirect('/signin') // Redirect to the sign-in page
        }
        redirectToSignIn()
      } else {
        console.log('Warning')
        toast.warn(data.msg, {
          position: 'top-right',
          autoClose: 3000,
        })
      }
      console.log(data)
    } catch (err) {
      console.log(
        'Error have been found ',
        { err },
        'Data not added succesfully '
      )
    }
  }

  return (
    <div className='flex justify-center p-4'>
      <div className='flex flex-col items-center'>
        <img src='./logo.png' alt='image' className='w-1/6 h-15 m-3' />
        <div className='rounded-xl border-2 border-black m-2 w-3/4 p-6'>
          <form method='POST' className='flex flex-col '>
            <p className='text-4xl  p-2'>SignUp</p>
            <label htmlFor='fname' className='pt-2 pl-2 text-xl font-bold'>
              Your Name
            </label>
            <input
              type='text'
              className='mt-2 mb-3  visible border-2 border-slate-400 rounded-xl h-9 p-3 ml-2'
              name='fname'
              onChange={addData}
              value={userData.fname}
            />
            <label htmlFor='email' className='pt-2 pl-2 text-xl font-bold'>
              Email
            </label>
            <input
              type='email'
              className='mt-2 mb-3  visible border-2 border-slate-400 rounded-xl h-9 p-3 ml-2'
              name='email'
              onChange={addData}
              value={userData.email}
            />
            <label htmlFor='mobile' className='pt-2 pl-2 text-xl font-bold'>
              Mobile Number
            </label>
            <input
              type='Number'
              className='mt-2 mb-3  visible border-2 border-slate-400 rounded-xl h-9 p-3 ml-2'
              name='mobile'
              onChange={addData}
              value={userData.mobile}
            />

            <label htmlFor='password' className='pt-2 pl-2 text-xl font-bold'>
              Password
            </label>
            <input
              type='password'
              className='mt-2 mb-3 visible border-2 border-slate-400 rounded-xl h-9 p-3 ml-2'
              name='password'
              placeholder='atleast 6 characters'
              onChange={addData}
              value={userData.password}
            />
            <label htmlFor='cpassword' className='pt-2 pl-2 text-xl font-bold'>
              Password-again
            </label>
            <input
              type='password'
              className='mt-2 mb-3 visible border-2 border-slate-400 rounded-xl h-9 p-3 ml-2'
              name='cpassword'
              placeholder='atleast 6 characters'
              onChange={addData}
              value={userData.cpassword}
            />
            <Button
              text='Continue'
              type='submit'
              className={'w-full right-6 mt-4 ml-2 mb-2'}
              onClickHandler={sendData}
            />
          </form>

          <Divider className='ml-2 mt-4 mb-4'></Divider>

          <p className='ml-2 font-medium'>
            {' '}
            Already Have an Account ?{' '}
            <NavLink to='../signin' className='signin text-blue-600'>
              SignIn
            </NavLink>
          </p>
        </div>
      </div>
      <ToastContainer closeOnClick />
    </div>
  )
}

export default SignUp
