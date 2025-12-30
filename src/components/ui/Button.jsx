import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  loading = false,
  disabled = false,
  className = '',
  fullWidth = true,
  variant = 'primary'
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${fullWidth ? 'w-full' : ''}
        ${variant === 'primary'
          ? 'bg-gradient-to-r from-red-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 shadow-lg hover:shadow-xl'
          : ''}
        ${variant === 'blue'
          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
          : ''}
        ${variant === 'success'
          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl'
          : ''}
        ${variant === 'danger'
          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl'
          : ''}
        ${variant === 'outline'
          ? 'border-2 border-red-600 text-red-600 hover:bg-red-50'
          : ''}
        ${variant === 'ghost'
          ? 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
          : ''}
        font-bold py-3 px-4 rounded-lg 
        transition duration-300 
        disabled:opacity-50 flex items-center justify-center
        ${className}
      `}
    >
      {loading ? (
        <div className="flex items-center">
          <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
          Processing...
        </div>
      ) : children}
    </button>
  );
};

export default Button;