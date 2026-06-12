import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

/**
 * ConfirmModal — remplace window.confirm() par une modale stylée.
 *
 * Props :
 *  - isOpen      : boolean — affiche ou masque la modale
 *  - title       : string  — titre (ex: "Supprimer ce hackathon")
 *  - message     : string  — message de confirmation
 *  - confirmLabel: string  — texte du bouton de confirmation (défaut: "Confirmer")
 *  - cancelLabel : string  — texte du bouton d'annulation (défaut: "Annuler")
 *  - variant     : 'danger' | 'warning' | 'default' — couleur du bouton de confirmation
 *  - onConfirm   : fn()   — appelée si l'utilisateur confirme
 *  - onClose     : fn()   — appelée pour fermer sans confirmer
 */
export default function ConfirmModal({
  isOpen,
  title = 'Confirmer',
  message = 'Êtes-vous sûr de vouloir continuer ?',
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  variant = 'danger',
  onConfirm,
  onClose,
}) {
  if (!isOpen) return null;

  const variantStyles = {
    danger:  { btn: 'bg-red-600 hover:bg-red-700 text-white', icon: 'text-red-600', iconBg: 'bg-red-50' },
    warning: { btn: 'bg-amber-500 hover:bg-amber-600 text-white', icon: 'text-amber-600', iconBg: 'bg-amber-50' },
    default: { btn: 'bg-slate-900 hover:bg-slate-700 text-white', icon: 'text-slate-600', iconBg: 'bg-slate-100' },
  };
  const v = variantStyles[variant] || variantStyles.default;
  const Icon = variant === 'danger' ? Trash2 : AlertTriangle;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(2px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-sm rounded-xl bg-white shadow-2xl ring-1 ring-slate-200 overflow-hidden"
        style={{ animation: 'modal-in 180ms ease' }}
      >
        {/* Body */}
        <div className="px-6 pt-6 pb-5 flex flex-col items-center text-center gap-4">
          {/* Icon */}
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${v.iconBg}`}>
            <Icon className={`h-6 w-6 ${v.icon}`} />
          </div>
          {/* Text */}
          <div>
            <h2 className="text-base font-semibold text-slate-900">{title}</h2>
            <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{message}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => { onConfirm(); onClose(); }}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${v.btn}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.94) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
