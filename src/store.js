import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './app/todoSlice'

export const store = configureStore({
  reducer: {
    todos:todoSlice,

  },
})