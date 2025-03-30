import React from 'react';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import authService from '../../appwrite/auth'
import {logout} from '../../features/authSlice'
const LogoutBtn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const logoutHandler = () => {
        authService.logout()
        .then(() => {//sare functions jo appwrite me bane hai vo promise return krte hai so we can use .then.catch.finally, etc.
            dispatch(logout())  //by dispatching ab store ke under jo logout ka value rahega vo updated rahega. auth status ko update krne ke liye.
            navigate('/login'); // Redirect to login page after logout
        })
        .catch((err) => {
          console.error('Logout failed:', err); // Log the error
          alert('Something went wrong. Please try again.'); // Optional user feedback
      })
    }
  return (
    <button
     type="button"
    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full cursor-pointer'
    onClick={logoutHandler}
    >Logout</button>
  );
};

export default LogoutBtn;