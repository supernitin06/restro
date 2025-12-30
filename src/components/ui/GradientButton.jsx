import React from 'react';

const GradientButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '',
  icon: Icon,
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/25',
    secondary: 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg shadow-purple-500/25',
    success: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25',
    danger: 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 shadow-lg shadow-rose-500/25',
    ghost: 'bg-white/10 hover:bg-white/20 border border-white/20'
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 
        rounded-xl
        font-semibold
        text-white
        transition-all duration-300
        hover:scale-105
        active:scale-95
        flex items-center justify-center gap-2
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};

export default GradientButton;