import React from 'react';

export default function DashboardStatCard({ title, value, icon, trend, trendLabel, subtitle }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center">
        <div className="flex-shrink-0 rounded-md bg-brand-50 p-3">
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="truncate text-sm font-medium text-slate-500">{title}</dt>
            <dd>
              <div className="text-2xl font-bold text-slate-900">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
      <div className="mt-4 border-t border-slate-100 pt-4">
        {trend ? (
          <p className="text-sm">
            <span className={`font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {trend}
            </span>{' '}
            <span className="text-slate-500">{trendLabel}</span>
          </p>
        ) : (
          <p className="text-sm text-slate-500">
            <span>{subtitle}</span>
          </p>
        )}
      </div>
    </div>
  );
}
