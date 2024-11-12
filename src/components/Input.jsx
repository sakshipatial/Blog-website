import React, {forwardRef, useId} from 'react';

const InputButton=forwardRef(function InputButton({
  label,
  type="text",
  className,
  ...props
  },ref) {
    const id=useId();
  return (
    <div className="w-full text-left">

      {label && <label 
      className="inline-block mb-1 pl-1 text-left "
      htmlFor={id}
      >
        {label}
      </label>}

      <input
        type={type}
        id={id}
        {...props}
        ref={ref}
        className={`px-3 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-full ${className} `}
      />
    </div>
  );
})  

export default InputButton;
