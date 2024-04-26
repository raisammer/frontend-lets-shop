const products = []

const getProductsReducer = (state = { products }, action) => {
  console.log('hhh', action.payload ,"sS" ,state)
  switch (action.type) {
    case 'SUCCESS_GET_DATA':
      return { products: action.payload }
    case 'FAILURE_GET_DATA':
      return { products: action.payload }
    default:
      return state
  }
  
}

export default getProductsReducer
