import React from 'react';

const Logo = ({width = '100px'}) => {
  return (
    <img src="/images/logo blog.webp" 
         alt="logo"
         className='w-24 h-24 rounded-full object-cover'
   />
  );
};

export default Logo;