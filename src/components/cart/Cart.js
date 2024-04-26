import React, { useContext } from 'react'
import Button from '../button/button'
import { Divider } from '@mui/material'
import { useParams, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import Loading from '../Loading/loading'
import { LoginContext } from '../context/ContextProvider'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Cart = () => {
  const { id } = useParams()

  const { account, setAccount } = useContext(LoginContext)
  const navigate = useNavigate('')
  console.log(id)
  const [product, setProduct] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const getData = async () => {
    try {
      console.log('comingnnn')
      const ind_data = await fetch(
        `https://backend-lets-shop.onrender.com/getproductsone/${id}`,
        {
          method: 'GET',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          // credentials: 'include',
        }
      )
      const data = await ind_data.json()
      console.log(data)
      setProduct(data)

      console.log('product hloo', product)
    } catch (err) {
      console.log('Individual data cannot be find ' + err.message)
    }
  }

  useEffect(() => {
    getData()
  }, [id])

  const addToCart = async (id) => {
    try {
      const data = await fetch(
        `https://backend-lets-shop.onrender.com/addcart/${id}`,
        {
          method: 'POST',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            product,
          }),
        }
      )
      const data1 = await data.json()
      if (data.status >= 400 || !data1) {
        console.log('Error in adding as invalid user')
        alert('User Invalid')
      }
      console.log(data)
      setAccount(data1)
      if (data.status === 201) {
        console.log('Added Successfully')
        toast.success('Data Added to Cart Successfully', {
          position: 'top-right',
          autoClose: 1000,
        })
      }
      navigate('/buynow')
    } catch (err) {
      console.log('Error in Adding to cart', err)
      toast.warn('Error in adding to cart', {
        position: 'top-right',
        autoClose: 3000,
      })
    }
  }

  useEffect(() => {
    console.log('Product state has been updated:', product)
    if (Object.keys(product).length > 0) {
      setIsLoading(false)
    }
    // Perform any actions that depend on the updated product state
  }, [product])

  if (isLoading) {
    return <Loading /> // Show loading message while data is being fetched
  }
  if (!isLoading) {
    return (
      // Cart item container
      <div className='m-10 flex sm:flex-row flex-col gap-4'>
        <div className='m-2 flex flex-col sm:w-1/2  gap-4  '>
          <div className='flex items-center justify-center'>
            <img
              src={product && product.url}
              alt=''
              className='m-4 h-[65vh] w-3/4 '
            />
          </div>
          <div className='flex sm:flex-row flex-col gap-2 '>
            <Button
              className='w-full hover:bg-slate-800'
              text='Add to Cart'
              onClickHandler={() => {
                addToCart(product.id)
              }}
            ></Button>
            <Button
              className='w-full hover:bg-slate-800'
              text='Buy Now'
            ></Button>
          </div>
        </div>
        <div className='border-2 border-slate-300 sm:w-1/2 m-2 p-5 text-black'>
          <p className='text-3xl font-bold mb-3 '>
            {product && product.title.shortTitle}
          </p>
          <h3 className='text-2xl mb-3 '>
            {product && product.title.longTitle}
          </h3>
          <div className='flex justify-center mb-2'>
            <Divider></Divider>
          </div>
          <p className=' mt-2 text-slate-500 text-lg'>
            M.R.P. :{' '}
            <pf className='line-through'>
              {' '}
              Rs. {product && product.price.mrp}
            </pf>{' '}
          </p>
          <p className=' mt-2 text-slate-500 text-lg'>
            Deal of the day :{' '}
            <span className=' text-red-600 '>
              {' '}
              Rs.{product && product.price.cost}
            </span>
          </p>
          <p className='mt-2 text-slate-500 text-lg'>
            You Save:{' '}
            <span className=' text-red-600 '>
              {' '}
              {product && product.price.mrp - product.price.cost} (
              {product && product.price.discount} off)
            </span>
          </p>
          <p className='mt-2 text-darkbrown text-xl'>
            Discount :{' '}
            <span className=' text-slate-800'>
              {' '}
              Extra {product && product.discount} off{' '}
            </span>
          </p>
          <p className='mt-2 text-sky-700 text-xl'>
            Free Delievery : <span className=' text-black'> Oct 8-21</span>{' '}
            Details
          </p>
          <p className='mt-2 text-sky-700 text-lg'>
            Fastest Delievery : <pf className=' text-black'> Tomorrow</pf>
          </p>
          <p className='text-xl font-medium mt-4'> About the item : </p>
          <p className='text-sm  text-slate-500'>{product.description}</p>
        </div>
        <ToastContainer closeOnClick />
      </div>
    )
  }
}

export default Cart
