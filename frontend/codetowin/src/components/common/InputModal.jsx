import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * InputModal — remplace le window.prompt() natif par une modale stylée.
 *
 * Props :
 *  - isOpen    : boolean — affiche ou masque la modale
 *  - title     : string  — titre affiché en haut (ex: "Ajouter un domaine")
 *  - label     : string  — label du champ de saisie
 *  - placeholder: string — placeholder de l'input
 *  - hint      : string  — texte d'aide optionnel sous le champ
 *  - tags      : array   — tags déjà sélectionnés à afficher (optionnel)
 *  - onConfirm : fn(value: string) — appelée avec la valeur saisie
 *  - onClose   : fn()   — appelée pour fermer sans confirmer
 */
export default function InputModal({
  isOpen,
  title = 'Ajouter',
  label = 'Valeur',
  placeholder = '',
  hint = '',
  tags = [],
  onConfirm,
  onClose,
}) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setValue('');
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    const trimmed = value.trim();
    if (trimmed) {
      onConfirm(trimmed);
      setValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); handleConfirm(); }
    if (e.key === 'Escape') onClose();
  };

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(2px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Panel */}
      <div
        className="w-full max-w-md rounded-xl bg-white shadow-2xl ring-1 ring-slate-200 overflow-hidden"
        style={{ animation: 'modal-in 180ms ease' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Tags existants (optionnel) */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((t, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-600"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Champ */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-shadow"
            />
            {hint && (
              <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!value.trim()}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Enregistrer
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.96) translateY(6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
