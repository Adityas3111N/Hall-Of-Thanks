import {configureStore} from '@reduxjs/toolkit' //imported from @reduxjs/toolkit
import authReducer from '../features/authSlice'
import commentReducer from '../features/commentSlice' //imported from ../features/commentSlice
const store = configureStore({
    reducer:{
     auth: authReducer,
     comments: commentReducer,
    },
    devTools: true
})

export default store