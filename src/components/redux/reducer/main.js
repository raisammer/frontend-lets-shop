import getProductsReducer from './productsreducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  getproductsData: getProductsReducer,
})
export default rootReducer;