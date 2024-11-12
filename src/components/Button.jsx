import React from 'react';

function Button({children,
  type="button",
  bgColor="bg-blue-500",
  textColor=" text-white",
  fontSize="font-bold ",
  className,
  ...props
 }) {
  return (
    <button
       type={type}
      className={` ${bgColor} ${textColor} ${fontSize}  py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}

export default Button; 
