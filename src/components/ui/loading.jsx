import React from 'react';

export function LoadingSpinner({ size = 'default', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4',
    default: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-neutral-300 border-t-primary-600 ${sizes[size]} ${className}`}></div>
  );
}

export function LoadingCard() {
  return (
    <div className="bg-white rounded-2xl shadow-soft border border-neutral-200/60 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gradient-to-br from-neutral-200 to-neutral-300"></div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-neutral-300 rounded-lg w-3/4"></div>
          <div className="h-6 bg-neutral-300 rounded-full w-20"></div>
        </div>
        <div className="h-4 bg-neutral-300 rounded w-1/2 mb-4"></div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="h-4 bg-neutral-300 rounded"></div>
          <div className="h-4 bg-neutral-300 rounded"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-neutral-300 rounded-lg w-24"></div>
          <div className="h-6 bg-neutral-300 rounded-full w-16"></div>
        </div>
      </div>
    </div>
  );
}