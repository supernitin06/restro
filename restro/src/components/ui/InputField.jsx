import React from 'react';

const InputField = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  required = false,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-gray-700 mb-2 font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
           input w-full px-4 py-3 border ${error ? 'border-red-500' : 'border-gray-300'} 
          rounded-lg focus:outline-none focus:ring-2 
          ${error ? 'focus:ring-red-500' : 'focus:ring-purple-500'} 
          focus:border-transparent transition duration-300
          placeholder-gray-400
        `}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default InputField;