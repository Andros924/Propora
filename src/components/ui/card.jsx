import React from 'react';

export function Card({ children, className = '', hover = false, ...props }) {
  const hoverClasses = hover ? 'hover:shadow-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer' : '';
  
  return (
    <div 
      className={`bg-white rounded-2xl shadow-soft border border-neutral-200/60 overflow-hidden ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div 
      className={`px-6 py-5 border-b border-neutral-200/60 bg-gradient-to-r from-neutral-50/50 to-transparent ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div 
      className={`px-6 py-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div 
      className={`px-6 py-4 border-t border-neutral-200/60 bg-gradient-to-r from-neutral-50/30 to-transparent ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}