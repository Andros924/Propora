import React from 'react';

export function Button({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'default', 
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-soft hover:shadow-medium focus-visible:ring-primary-500',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white shadow-soft hover:shadow-medium focus-visible:ring-secondary-500',
    success: 'bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white shadow-soft hover:shadow-medium focus-visible:ring-success-500',
    outline: 'border-2 border-neutral-300 hover:border-primary-400 hover:bg-primary-50 text-neutral-700 hover:text-primary-700 focus-visible:ring-primary-500',
    ghost: 'hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 focus-visible:ring-neutral-500',
    danger: 'bg-gradient-to-r from-error-500 to-error-600 hover:from-error-600 hover:to-error-700 text-white shadow-soft hover:shadow-medium focus-visible:ring-error-500',
  };
  
  const sizes = {
    sm: 'h-9 px-4 text-sm rounded-lg',
    default: 'h-11 px-6 text-base rounded-xl',
    lg: 'h-13 px-8 text-lg rounded-xl',
  };
  
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.default;
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;