import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from '../features/authSlice' //this is how we can use login with a different name authLogin
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import {useForm} from 'react-hook-form'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm() //both are default event provided by react-hook-form and have no relation with signup
    const [error, setError] = useState(null)
   
    //YHA DATA REGISTER SE AATA HAI.
    const login = async(data) => {//async isliye kyuki data dene me aur sari chijein krne me thoda time lagega
        setError("") //kabhi bhi koi bhi site banana to jb bhi login karwana error
        //  ko emptyout kr dena fir try catch ka use krna to check if we can send 
        // the data to the user or not.
        try {//data ek object h. jo hame login ko pass krna padega
            const session = await authService.login(data) //data is an object
            if(!session){
                throw new Error("Please enter valid email and password")
            }
            const userData = await authService.getCurrentUser()
            if(!userData){
                throw new Error("User session missing. Please login again.")
            }

            dispatch(authLogin({userData})) //dispatching in the same format is very imp. 
            // i was figuring out the bug from so much time. i have used used useeffect etc 
            // and also set timout consoled log. what was happening is this that i was getting
            //  undefined but when i refresh once i get the things right.

            setTimeout(() => {
                navigate("/login-intro");
            }, 10);
            //redirecting to reintro page

        } catch (error) {
            setError(error.message)
            console.log(error)
        }
    }
  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {/* agr error hai to display karao */}
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-8'> 
            {/* on submit handleSubmit event call our login function. it is imported from useForm().
            ab y use krne ka benifit y hai jitni bhi values hmne use kiya hai unki states hme manage 
            nahi krni padegi. jab handleSubmit event call hoga to register se automatically states update ho jayengi*/}
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                //kyuki hm use form ka use kr rahe hai is liye is register ki jarurat 
                // padegi. spread krna padega kyuki waise kahi aur AGR REGISTER KISI AUR INPUT 
                // KO HANDLE KRNE KE LIYE USE KIYA TO VO OVERWRITE HO JAEGA SO SPREAD WHOLE OBJECT
                // INSTEAD.
                //AUR SBKO UNIQUE NAME DENA BHI JARURI HAI JAISE YE EMAIL KA H.
                {...register("email", {
                    //ISKE BAD KEVL REQUIRED AUR VALIDATE. AUR bohot sare options here you can read on docs of useForm.
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||  //regex of email. validator
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {  //...props
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  );
};

export default Login;


// (b) Form Handling
// React Hook Form (useForm):
// register: Connects input fields to the form.
// handleSubmit: Handles form submission automatically. You don’t need to manually track input values.

// (d) Form Submission
// On Submit: handleSubmit(login) connects the form with the login function.
// Validation:
// Email Field:
// Regex pattern to check if the email is valid.
// If invalid, an error message is displayed.
// Password Field:
// Required field validation.


// 6. Code Flow
// User fills in the email and password.
// Submits the form.
// handleSubmit calls the login function with form data.
// Inside login:
// Calls the authService.login(data) function.
// If successful:
// Fetches the current user.
// Dispatches the user data to Redux.
// Redirects to /.
// If an error occurs:
// Displays the error message.