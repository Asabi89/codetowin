import React from 'react';

export default function PageHeader({ title, description, as: TitleTag = 'h1', actions }) {
  return (
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="sm:flex-auto">
        <TitleTag className="font-display text-2xl font-bold text-slate-900">{title}</TitleTag>
        {description && (
          <p className="mt-2 text-sm text-slate-700">{description}</p>
        )}
      </div>
      {actions && (
        <div className="mt-4 sm:mt-0">
          {actions}
        </div>
      )}
    </div>
  );
}
