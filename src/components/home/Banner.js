import React from 'react'
import Carousel from 'react-material-ui-carousel'

// Iss data ko hum backend se bhi manga sakte hh

const data = [
  'https://rukminim1.flixcart.com/flap/1680/280/image/1defb861e409319b.jpg?q=50',
  ' https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50',
  'https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50',
  'https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50',
]
const Banner = () => {
  return (
    <div className='items-center'>
      <Carousel
        className='bg-white'
        autoPlay={true}
        stopAutoPlayOnHover={true}
        interval='4000'
        animation='slide'
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        navButtonsProps={{
          style: {
            backgroundColor: 'white',
            color: 'black',
            borderRadius: 0,
            marginTop: -25,
            height: '104 px',
          },
        }}
      >
        {data.map((item, i) => (
          <>
            <item className='flex justify-center'>
              <img src={item} alt='i' />
            </item>
          </>
        ))}
      </Carousel>
    </div>
  )
}

export default Banner;
