import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  loading = false, 
  disabled = false,
  className = '',
  fullWidth = true
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${fullWidth ? 'w-full' : ''}
        bg-gradient-to-r from-red-600 to-pink-500 
        text-white font-bold py-3 px-4 rounded-lg 
        hover:from-purple-700 hover:to-pink-600 
        transition duration-300 
        disabled:opacity-50 flex items-center justify-center
        shadow-lg hover:shadow-xl
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