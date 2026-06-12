import React from 'react';
import { MoreVertical } from 'lucide-react';

export default function HeaderMenu({ options = [], open, onToggle }) {
  if (options.length === 0) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none"
      >
        <MoreVertical className="h-5 w-5" />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-64 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          {options.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={option.onClick}
              className={`flex w-full items-center px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${option.danger ? 'text-red-600 hover:bg-red-50' : 'text-slate-700'}`}
            >
              {option.icon && (
                <span className="mr-3 flex items-center justify-center h-4 w-4 shrink-0">
                  {option.icon}
                </span>
              )}
              <span className="truncate text-left flex-1">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
