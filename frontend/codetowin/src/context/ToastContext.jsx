import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

function ToastItem({ toast, onDismiss }) {
  // A subtle tint based on type
  const typeStyles = {
    success: "bg-slate-800 text-white",
    danger: "bg-red-900 text-white",
    warning: "bg-amber-800 text-white"
  };

  const styleClass = typeStyles[toast.type] || typeStyles.success;

  return (
    <div
      className={`flex items-center rounded-full px-4 py-2.5 text-sm font-medium shadow-lg transition-all animate-in fade-in slide-in-from-bottom-4 ${styleClass}`}
      role="alert"
    >
      <div className="mr-2">
        {toast.message}
      </div>
      <button
        type="button"
        className="ml-auto inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full opacity-70 hover:opacity-100 focus:outline-none"
        aria-label="Fermer"
        onClick={() => onDismiss(toast.id)}
      >
        <span className="sr-only">Fermer</span>
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message, type = "success") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((currentToasts) => [...currentToasts, { id, message, type }]);
    window.setTimeout(() => dismissToast(id), 4500);
  }, [dismissToast]);

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-6 left-1/2 z-[100] flex w-max max-w-[90vw] -translate-x-1/2 flex-col items-center gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onDismiss={dismissToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
