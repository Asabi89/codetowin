import React from 'react';

export default function SearchFilterBar({ searchPlaceholder, filters = [], actions }) {
  return (
    <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
      {searchPlaceholder && (
        <div className="relative rounded-md shadow-sm w-full sm:w-64">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input type="text" className="block w-full rounded-md border-slate-300 pl-10 focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 border shadow-sm" placeholder={searchPlaceholder} />
        </div>
      )}

      {filters.map((filter) => (
        <select key={filter.label} aria-label={filter.label} className="block w-full sm:w-auto rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm border shadow-sm">
          {filter.options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ))}

      {actions && (
        <div className="sm:ml-auto">
          {actions}
        </div>
      )}
    </div>
  );
}
