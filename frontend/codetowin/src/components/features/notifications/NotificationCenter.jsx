import React from 'react';
import { Link } from 'react-router-dom';

const actionClassNames = {
  secondary: 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-brand-500',
  primary: 'border-transparent bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500',
};

function NotificationAction({ action }) {
  const className = `inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${actionClassNames[action.variant || 'secondary']}`;

  if (action.to) {
    return (
      <Link to={action.to} className={className}>
        {action.label}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={action.onClick}>
      {action.label}
    </button>
  );
}

function NotificationItem({ notification, onNotificationClick }) {
  return (
    <li
      className={`transition cursor-pointer relative ${notification.unread ? 'bg-brand-50/50 hover:bg-brand-50/80' : 'hover:bg-slate-50'}`}
      onClick={() => onNotificationClick?.(notification)}
    >
      {notification.unread && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500"></div>
      )}

      <div className="px-4 py-5 sm:px-6 flex items-start">
        <div className="flex-shrink-0 pt-1">
          <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${notification.iconBg}`}>
            {notification.icon}
          </span>
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between gap-4">
            <p className={`text-sm font-medium ${notification.unread ? 'text-slate-900' : 'text-slate-700'}`}>{notification.title}</p>
            <p className={`shrink-0 text-sm ${notification.unread ? 'text-brand-600 font-semibold' : 'text-slate-500'}`}>{notification.time}</p>
          </div>
          <p className={`mt-1 text-sm ${notification.unread ? 'text-slate-600' : 'text-slate-500'}`}>
            {notification.description}
          </p>

          {notification.actions?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-3">
              {notification.actions.map((action) => (
                <span key={action.label} onClick={(event) => event.stopPropagation()}>
                  <NotificationAction action={action} />
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default function NotificationCenter({
  title = 'Vos Notifications',
  description,
  filters = [],
  notifications = [],
  loadMoreLabel = 'Charger plus de notifications',
  onNotificationClick,
}) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full">
      <div className="mx-auto max-w-4xl">
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <div className="sm:flex-auto">
            <h1 className="font-display text-2xl font-bold text-slate-900">{title}</h1>
            {description && (
              <p className="mt-2 text-sm text-slate-700">{description}</p>
            )}
          </div>

          {filters.length > 0 && (
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <select className="block w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm border shadow-sm">
                {filters.map((filter) => (
                  <option key={filter}>{filter}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="bg-white shadow sm:rounded-lg overflow-hidden border border-slate-200">
          <ul role="list" className="divide-y divide-slate-200">
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} onNotificationClick={onNotificationClick} />
            ))}
          </ul>
        </div>

        <div className="mt-4 flex justify-center">
          <button type="button" className="text-sm font-medium text-brand-600 hover:text-brand-800 bg-white border border-slate-200 px-4 py-2 rounded-md shadow-sm">
            {loadMoreLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
