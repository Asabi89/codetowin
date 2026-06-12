import React from 'react';

export default function Card({ children, className = '', noPadding = false, ...props }) {
  return (
    <div 
      className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
      {...props}
    >
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`border-b border-slate-200 bg-slate-50 px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`border-t border-slate-200 bg-slate-50 px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
