import React from 'react';

export function SpinnerIcon({ size = 'lg', className = '' }) {
  const sizes = {
    sm: 'h-6',
    md: 'h-10',
    lg: 'h-16',
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <video
        src="/assets/brand/loading-spinner.mp4"
        className={`${sizes[size] || sizes.lg} w-auto object-contain rounded-full`}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}

export default function LoadingSpinner({
  message = 'Chargement...',
  fullHeight = true,
  size = 'lg',
  className = '',
}) {
  return (
    <div className={`flex ${fullHeight ? 'h-full min-h-[60vh]' : ''} items-center justify-center p-8 ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        <div role="status" aria-label={message || 'Chargement'}>
          <SpinnerIcon size={size} />
          <span className="sr-only">{message || 'Chargement'}</span>
        </div>
        {message && (
          <p className="text-sm font-medium text-slate-500">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
