import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  type = 'button', 
  icon: Icon,
  disabled = false,
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
  
  const variants = {
    primary: "border border-transparent bg-brand-600 text-white shadow-sm hover:bg-brand-700 focus:ring-brand-500 disabled:bg-brand-400 disabled:cursor-not-allowed",
    secondary: "border border-transparent bg-brand-100 text-brand-700 hover:bg-brand-200 focus:ring-brand-500",
    outline: "border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50 focus:ring-brand-500",
    danger: "border border-transparent bg-red-600 text-white shadow-sm hover:bg-red-700 focus:ring-red-500",
    ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className={`-ml-1 mr-2 ${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'}`} aria-hidden="true" />}
      {children}
    </button>
  );
}
