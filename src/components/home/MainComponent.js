import React from 'react'
import Banner from './Banner.js'
import Slide from './Slide.js'
import getProducts from '../redux/actions/action.js'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import Loading from '../Loading/loading.js'

const MainComponent = () => {
  const dispatch = useDispatch()
  const productsData = useSelector((state) => {
   // console.log("MAIN " ,state.getproductsData);
    return state.getproductsData
  })

  useEffect(() => {
    console.log('dispatch')
    getProducts()(dispatch)
  }, [dispatch])
 

  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (Object.keys(productsData).length > 0) {
      setLoad(false)
    }
  }, [productsData])
   
  console.log(load, productsData);
  if (load) {
    return <Loading /> // Show loading message while data is being fetched
  }
  return (
    <>
      <div className='relative h-full w-full  bg-white'>
        <div >
          <Banner> </Banner>
        </div>
        <div className='flex gap-2'>
          <div className='w-3/4 bg-gray-100'>
            {productsData && (
              <Slide
                title='Deal of the Day'
                products={productsData.products}
              ></Slide>
            )}
          </div>
          <div
            className='w-1/4 h-1/2 items-center sm:flex sm:flex-col gap-1 bg-gray-100'
          >
            <h3 className='text-xl'>Festive Latest Launches</h3>
            <img
              src='https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg'
              alt=' right_image'
              className='h-full w-full object-cover'
            />
            <a href='#' className='text-blue-400 text-center m-2'>
              See More...
            </a>
          </div>
        </div>
        <div className='flex justify-center m-2'>
          <img
            src='https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg'
            alt=''
          />
        </div>
        {productsData && (
          <>
            <Slide title='Best Seller' products={productsData.products}></Slide>
            <Slide
              title='Upto 80% off'
              products={productsData.products}
            ></Slide>
          </>
        )}
      </div>
    </>
  )
}

export default MainComponent
