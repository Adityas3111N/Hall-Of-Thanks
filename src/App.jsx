import React ,{ useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './features/authSlice'
import './App.css'
import {Header, Footer} from './components'
import {Outlet} from 'react-router-dom'

function App() {
//we need a loading state bcz as soon as website opens it need to fetch data. and with loading state we can display some loading animation unless our website loads.
const [loading, setLoading] = useState(true);
const dispatch = useDispatch();

useEffect(() => {
  authService.getCurrentUser()
  .then((userData) => {
    if(userData){
      dispatch(login({userData}));
    }
    else{
      dispatch(logout());
    }
  })
  .catch(
    (error) => console.error("error :: app.jsx :: useeffect :: checking login or not", error)
  )
  .finally(
    () => setLoading(false)
  )
}, [])
 

//apne man se apni tarah se return karenge
//conditional rendering
// if(loading){
//   return <div>loading...</div>
// }

return (!loading) ? (
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
     <Header/>
     <main>
     <Outlet/>
     </main>
     <Footer/>
    </div>
  </div>
) :null

}

export default App
