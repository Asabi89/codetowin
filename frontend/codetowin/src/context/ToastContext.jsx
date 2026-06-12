import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

const toastStyles = {
  success: {
    iconWrap: "bg-emerald-100 text-emerald-700",
    icon: (
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 11.917 9.724 16.5 19 7.5"
      />
    ),
    label: "Succès",
  },
  danger: {
    iconWrap: "bg-red-100 text-red-700",
    icon: (
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18 17.94 6M18 18 6.06 6"
      />
    ),
    label: "Erreur",
  },
  warning: {
    iconWrap: "bg-amber-100 text-amber-700",
    icon: (
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    ),
    label: "Attention",
  },
};

function ToastItem({ toast, onDismiss }) {
  const style = toastStyles[toast.type] || toastStyles.success;

  return (
    <div
      className="flex w-full max-w-sm items-center rounded-lg border border-slate-200 bg-white p-4 text-slate-700 shadow-lg"
      role="alert"
    >
      <div
        className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded ${style.iconWrap}`}
      >
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          {style.icon}
        </svg>
        <span className="sr-only">{style.label}</span>
      </div>
      <div className="ms-3 text-sm font-medium">{toast.message}</div>
      <button
        type="button"
        className="ms-auto flex h-8 w-8 items-center justify-center rounded border border-transparent bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
        aria-label="Fermer"
        onClick={() => onDismiss(toast.id)}
      >
        <span className="sr-only">Fermer</span>
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18 17.94 6M18 18 6.06 6"
          />
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
      <div className="fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
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
