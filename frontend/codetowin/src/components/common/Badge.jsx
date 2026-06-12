import React from 'react';

export default function Badge({ children, variant = 'slate', className = '' }) {
  const variants = {
    slate: 'bg-slate-100 text-slate-800',
    green: 'bg-green-100 text-green-800',
    amber: 'bg-amber-100 text-amber-800',
    brand: 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-600/20',
    blue: 'bg-blue-100 text-blue-800',
    red: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant] || variants.slate} ${className}`}>
      {children}
    </span>
  );
}
