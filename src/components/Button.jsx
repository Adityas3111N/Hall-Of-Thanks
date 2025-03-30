import React from 'react';

const Button = ({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',  //to let add class name in other components where using this btn.
    ...props//spread other props if they are using. if more attributes used other that className

}) => {
    return (
        <button className={`px-4 py-3 rounded-lg cursor-pointer ${bgColor} ${textColor} ${className}`}{...props}>
            {children}
            </button> //for inserting js we use tildas and curly braces.
    );
};


export default Button;