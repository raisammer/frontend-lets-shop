const getProducts = () => async (dispatch) => {
  try {
    const data = await fetch(
      'https://backend-lets-shop.onrender.com/getproducts',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const res = await data.json()
    console.log(':?', res)
    dispatch({ type: 'SUCCESS_GET_DATA', payload: res })
  } catch (err) {
    console.log('Error', err)
    dispatch({ type: 'FAILURE_GET_DATA', payload: err })
  }
}
export default getProducts
