import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const InputField = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  required = false,
  className = '',
  startIcon = null,
  endIcon = null,
  helperText = '',
  disabled = false,
  min,
  max,
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative group">
        {startIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors pointer-events-none">
            {startIcon}
          </div>
        )}

        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          min={min}
          max={max}
          className={`
            w-full bg-white dark:bg-gray-800 
            text-gray-900 dark:text-white
            ${startIcon ? 'pl-11' : 'px-4'} 
            ${endIcon ? 'pr-11' : 'px-4'} 
            py-3 rounded-xl border-2
            transition-all duration-200 ease-in-out
            placeholder-gray-400 dark:placeholder-gray-500
            disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-gray-900
            ${error
              ? 'border-red-300 dark:border-red-900/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
              : 'border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-400/10 hover:border-gray-300 dark:hover:border-gray-600'
            }
            outline-none text-sm font-medium
            shadow-sm
          `}
          {...props}
        />

        {endIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors pointer-events-none">
            {endIcon}
          </div>
        )}
      </div>

      {helperText && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 ml-1">
          {helperText}
        </p>
      )}

      {error && (
        <div className="flex items-center gap-1.5 mt-1.5 ml-1 text-red-500 text-xs font-medium animate-fadeIn">
          <FaExclamationCircle size={12} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default InputField;