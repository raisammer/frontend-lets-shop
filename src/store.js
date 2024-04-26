import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "./components/redux/reducer/main.js"

const store = configureStore({
  reducer: rootReducer,
})

export default store;
