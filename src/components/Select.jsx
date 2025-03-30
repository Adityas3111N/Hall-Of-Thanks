import React, { useId } from 'react';

function Select({ label, options, className, ...props }, ref) {
  const id = useId();
  return (
    <div className='w-full'>
      {/* Corrected the htmlFor to use the generated id and display the label prop */}
      {label && <label htmlFor={id} className=''>{label}</label>} 
      
      <select 
        // You might want to remove the empty name="" if you're using react-hook-form,
        // as it should receive a proper name via ...props.
        id={id}
        {...props}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map((option) => (
          // Changed curly braces to parentheses to implicitly return the <option>
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
