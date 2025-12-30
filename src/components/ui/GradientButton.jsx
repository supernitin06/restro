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
    primary: 'btn-primary',
    secondary: 'btn-ghost',
    success: 'btn-primary',
    danger: 'btn-danger',
    ghost: 'btn-ghost',
  };

  return (
    <button
      onClick={onClick}
      className={`
        btn
        hover:scale-105
        active:scale-95
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