import Navbar from './components/header/navbar.js'
import NewNavBar from './components/down_header/newNavbar.js'
import MainComponent from './components/home/MainComponent.js'
import Footer from './components/Footer/footer.js'
import { Routes, Route } from 'react-router-dom'
import SignIn from './components/login/SignIn.js'
import SignUp from './components/login/SignUp.js'
import Cart from './components/cart/Cart.js'
import BuyNow from './components/BuyNow/BuyNow.js'
function App() {
  return (
    <>
      <Navbar></Navbar>
      <NewNavBar></NewNavBar>
      <Routes>
        <Route path='/' element={<MainComponent />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/getproductsone/:id' element ={<Cart />} />
        <Route path='/buynow' element={<BuyNow />} />
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
