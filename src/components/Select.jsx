import React, { useState ,useId } from 'react';

function SelectButton({
  options,
label,
className,
bgColor,
...props
},ref) {
  const id=useId();
  return (
    <div className="flex flex-col items-center mt-8">
     {label && <label htmlFor={id} className="mb-2 text-lg font-medium text-gray-700">
        Select an option:
      </label>}
      <select
        id={id}
        ref={ref}
       { ...props}
        className={`w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${bgColor} ${className}`}
      >
        {options?.map((option)=>(
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(SelectButton);
