import React, { useState, useEffect } from 'react'

const SubTotal = ({ className, items }) => {
  const [price, setPrice] = useState(0)
  useEffect(() => {
    changePrice()
  }, [items])
 //  console.log(items&&items);
  const changePrice = () => {
    let amount = 0
    if (items) {
      items.map((item) => {
        amount += item.price.cost
      })
      setPrice(amount);
    }
  }
  return (
    <div>
      <p className={`text-xl m-2 ${className}`}>
        SubTotal ({items?items.length:0} items) :{' '}
        <span className='text-black font-bold '>Rs {price}</span>
      </p>
    </div>
  )
}

export default SubTotal
