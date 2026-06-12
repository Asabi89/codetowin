import React from 'react';

export default function Input({
  label,
  id,
  type = 'text',
  error,
  helpText,
  icon: Icon,
  className = '',
  wrapperClassName = '',
  ...props
}) {
  return (
    <div className={wrapperClassName}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="h-5 w-5 text-slate-400" aria-hidden="true" />
          </div>
        )}
        <input
          type={type}
          id={id}
          className={`block w-full rounded-md sm:text-sm
            ${Icon ? 'pl-10' : 'pl-3'}
            ${error 
              ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' 
              : 'border-slate-300 focus:border-brand-500 focus:ring-brand-500'}
            ${className}`}
          {...props}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>{error}</p>}
      {helpText && !error && <p className="mt-2 text-sm text-slate-500" id={`${id}-description`}>{helpText}</p>}
    </div>
  );
}
