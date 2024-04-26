import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { NavLink } from 'react-router-dom'

import { Divider } from '@mui/material'
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

const Slide = ({ title, products }) => {
  //console.log(title, 'Aa GYE ', products)

  return (
    <div
      className='m-3 h-2/5 relative rounded-xl bg-gray-100 gap-2'
    >
      <div className='sm:flex sm:flex-row sm:justify-between p-2 items-center'>
        <h3 className='text-xl text-center'>{title}</h3>
        <button
          className='text-xl pl-2 pr-2 pt-1 pb-1 bg-blue-600 text-white rounded-xl'
        >
          {' '}
          View All
        </button>
      </div>
      <Divider></Divider>
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={false}
        showDots={false}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        centerMode={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition='all .5'
        transitionDuration={500}
        containerClass='carousel-container'
        removeArrowOnDeviceType={['tablet', 'mobile']}
        dotListClass='custom-dot-list-style'
        itemClass='carousel-item-padding-40-px'
        className='gap-2'
      >
        {products &&
          products.map((product, i) => {
            return (
              <>
                <NavLink to={`/getproductsone/${product.id}`}>
                  <div
                    className='flex flex-col gap-2 items-center '
                  >
                    <div
                      className='lg:h-48 lg:w-48 sm:h-36 sm:w-36 h-5/6 w-3/5 gap-2'
                    >
                      <img
                        src={product.url}
                        alt={product.id}
                        className='h-full w-full'
                      />
                    </div>
                    <h5 className=''>{product.title.shortTitle}</h5>
                    <h5 className=''>{product.discount}</h5>
                    <h5 className=''>{product.tagline}</h5>
                  </div>
                </NavLink>
              </>
            )
          })}
      </Carousel>
    </div>
  )
}

export default Slide
