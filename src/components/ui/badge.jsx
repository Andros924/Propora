import React from 'react';

export function Badge({ children, variant = 'default', className = '', size = 'default', ...props }) {
  const variants = {
    default: 'bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-800 border border-neutral-300/50',
    success: 'bg-gradient-to-r from-success-100 to-success-200 text-success-800 border border-success-300/50',
    warning: 'bg-gradient-to-r from-warning-100 to-warning-200 text-warning-800 border border-warning-300/50',
    error: 'bg-gradient-to-r from-error-100 to-error-200 text-error-800 border border-error-300/50',
    info: 'bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 border border-primary-300/50',
    secondary: 'bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-800 border border-secondary-300/50'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs rounded-md',
    default: 'px-3 py-1 text-sm rounded-lg',
    lg: 'px-4 py-1.5 text-base rounded-xl'
  };

  return (
    <span 
      className={`inline-flex items-center font-medium shadow-soft ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}