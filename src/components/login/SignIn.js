import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import Button from '../button/button'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LoginContext } from '../context/ContextProvider'

const SignIn = () => {
  const [logdata, setLogData] = useState({
    email: '',
    password: '',
  })
  console.log(logdata)
  const addData = (e) => {
    const { name, value } = e.target
    setLogData(() => {
      return {
        ...logdata,
        [name]: value,
      }
    })
  }
  const redirect = useNavigate('')
  const { account, setAccount } = useContext(LoginContext)
  const sendData = async (e) => {
    e.preventDefault()
    try {
      const { email, password } = logdata
      const res = await fetch('https://backend-lets-shop.onrender.com/login', {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: 'include',
      })

      const data = await res.json()
      console.log(data)
      console.log("User's LOgin ")
      if (res.status === 201) {
        console.log('Successfull')
        setAccount(data)
        setLogData({
          ...logdata,
          email: '',
          password: '',
        })

        toast.success('Loginned Successfully', {
          position: 'top-right',
          autoClose: 3000,
        })

        const redirectToSignIn = async () => {
          await new Promise((resolve) => setTimeout(resolve, 3000)) // Delay for 2 seconds
          redirect('/') // Redirect to the sign-in page
        }
        redirectToSignIn()
      } else {
        console.log('Warning')
        toast.warn(data.msg, {
          position: 'top-right',
          autoClose: 3000,
        })
      }
      //console.log(data)
    } catch (err) {
      console.log(
        'Error have been found ',
        { err },
        'Data not added succesfully '
      )
    }
  }
  return (
    <div className='signin' class='flex justify-center p-4'>
      <div className='box-thing' class='flex flex-col items-center'>
        <img src='./logo.png' alt='image' class='w-1/6 h-15 m-3' />
        <div
          className='form'
          class='rounded-xl border-2 border-black m-2 w-3/4 p-6'
        >
          <form action='' className='SigIn-form' class='flex flex-col '>
            <p className='text-4xl p-2'>SignIn</p>
            <label htmlFor='email' class='pt-2 pl-2 text-xl font-bold'>
              Email
            </label>
            <input
              type='email'
              class='mt-2 mb-3  visible border-2 border-slate-400 rounded-xl h-9 p-3 ml-2'
              name='email'
              onChange={addData}
              value={logdata.email}
            />
            <label htmlFor='password' class='pt-2 pl-2 text-xl font-bold'>
              Password
            </label>
            <input
              type='password'
              className='mt-2 mb-3 visible border-2 border-slate-400 rounded-xl h-9 p-3 ml-2'
              name='password'
              placeholder='atleast 6 characters'
              onChange={addData}
              value={logdata.password}
            />
            <Button
              text='Continue'
              type='submit'
              className={'w-full right-6 mr-4 mt-4 ml-2'}
              onClickHandler={sendData}
            />
          </form>
          <ToastContainer closeOnClick />
        </div>
        <p className='text-gray-500 pt-10 pb-4'> New to let's-shop?</p>
        <NavLink
          to='../signup'
          className='w-3/4 h-10 rounded-xl bg-slate-200 text-center border-2 p-1 border-black hover:bg-slate-300'
        >
          {' '}
          Create your Let's-shop account
        </NavLink>
      </div>
    </div>
  )
}

export default SignIn
