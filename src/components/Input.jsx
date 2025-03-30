import React, { useId } from 'react';

const Input = React.forwardRef(function Input({ //props
    label, //sometimes username, sometimes password, etc.
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && (
            <label className='inline-block pl-1 mb-1' htmlFor='id' > 
                {label}
            </label>
            )}
{/* //if label passed in the component then display this label */}

            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${className}`}
                ref = {ref} //this helps alot in making components further and using onclick etc there.
                {...props}
                id = {id}
            />
        </div>
    );
})

export default Input;

//forward ref hook - if we have made a component then its state will be there
// where coponent is made but that needs to be used somewhere else. so we also
// need to know state there where its used for that we need forward ref hook.

//by using this we are forwarding the referance whereever it will be used we
// will get state of there.

//like isme kya input hai we have to know all over the places. so that is why.