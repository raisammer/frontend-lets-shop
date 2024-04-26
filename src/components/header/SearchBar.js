import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import React ,{useState} from 'react'
import { Search } from '@mui/icons-material'

const SearchBar = () =>{
     const [text, setText] = useState('')
     const [searchOpen, setSearchOpen] = useState(false)
     const [searchedData, setSearchedData] = useState({})
     const productsData = useSelector((state) => {
       // console.log("MAIN " ,state.getproductsData);
       return state.getproductsData
     })

     const searchFunction = (e) => {
       setText(e)
       setSearchOpen(true)
       console.log(e, productsData)
       const searchedProduct = productsData.products.filter((item) => {
         if (item.title.longTitle.toLowerCase().includes(e.toLowerCase())) {
           return item
         }
       })
       setSearchedData(searchedProduct)
     }
     return (
       <>
         <div className='w-2/5 relative'>
           <div className='relative mt-2'>
             <Search className='absolute right-4 top-3 text-gray-700' />
             <input
               type='text'
               className='w-full py-2 px-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
               placeholder='Search...'
               onChange={(e) => searchFunction(e.target.value)}
               value={text}
             />
           </div>
           {searchOpen && text && (
             <div className='fixed w-2/5 z-50 mt-2 bg-white rounded-md shadow-lg flex flex-col gap-2'>
               {searchedData.map((item, index) => (
                 <NavLink
                   to={`/getproductsone/${item.id}`}
                   onClick={() => setSearchOpen(false)}
                 >
                   <div
                     key={index}
                     className='h-[40px] w-full hover:bg-gray-100 pl-3 cursor-pointer flex flex-row items-center'
                   >
                     <img
                       src={item.url}
                       className='p-[2px]  bg-cover bg-center w-[40px] h-[40px]'
                     />
                     <p className='p-2 text-black font-bold m-1 '>
                       {item.title.longTitle}
                     </p>
                   </div>
                 </NavLink>
               ))}
             </div>
           )}
         </div>
       </>
     )
}

export {SearchBar};