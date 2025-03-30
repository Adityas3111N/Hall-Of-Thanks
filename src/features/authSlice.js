import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    status: false,
    userData: null
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
        }
    }
})

export const {login, logout} = authSlice.actions;  //const action ko bhi unke dadaji authslice se lekr export krte hai taki baki log use use kr pae.
export default authSlice.reducer; //hamesa reducer to export karna hi hota hai jis variable me vo store hota hai usme se.