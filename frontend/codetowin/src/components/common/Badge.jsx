import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    info: 'bg-blue-100 text-blue-800',
  };
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold leading-5 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
