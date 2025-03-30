import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
  //if loader is true then show loading... else show children.

}
//by wrapping components in Authlayout, we can easily handle that wheather they 
// need authentication or not and even if they need we can easily do with just this 
// component.



// Pros:
// Flexible for Future Needs:

// It supports both scenarios: when authentication is required (true) and when it’s explicitly not required (false). For example, if a route like /signup doesn’t require authentication, this logic handles it properly.
// Explicit Intent:

// By checking authentication and comparing it with authStatus, you clearly convey the route's requirement.
// Adaptability:

// You can easily tweak the logic if more nuanced conditions arise, like handling user roles (e.g., admin vs user) or partial access.