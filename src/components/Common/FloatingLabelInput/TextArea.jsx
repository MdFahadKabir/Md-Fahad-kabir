import React, { forwardRef } from "react";

const TextArea = forwardRef(({ label, rows = 4, error, ...props }, ref) => {
  return (
    <div className="relative w-full mb-6">
      <textarea
        ref={ref}
        id={props.name}
        rows={rows}
        className={`block w-full px-4 py-3 text-white bg-white/5 border ${error ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-brand-purple'} rounded-lg appearance-none focus:outline-none focus:ring-0 peer transition-all duration-300 resize-none`}
        placeholder=" "
        {...props}
      />
      <label
        htmlFor={props.name}
        className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 ${error ? 'text-red-500' : 'text-slate-400 peer-focus:text-brand-purple'}`}
      >
        {label}
      </label>
      {error && <span className="text-red-500 text-xs mt-1 absolute -bottom-5 left-1">{error.message}</span>}
    </div>
  );
});

TextArea.displayName = "TextArea";
export default TextArea;
