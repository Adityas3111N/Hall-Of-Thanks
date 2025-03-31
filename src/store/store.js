import {configureStore} from '@reduxjs/toolkit' //imported from @reduxjs/toolkit
import authReducer from '../features/authSlice'
import commentReducer from '../features/commentSlice' //imported from ../features/commentSlice
import profileReducer from '../features/profileSlice' //imported from ../features/profileSlice
const store = configureStore({
    reducer:{
     auth: authReducer,
     comments: commentReducer,
     profile: profileReducer,
    },
    devTools: true
})

export default store