import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function EmbeddedPublicView({
  children,
  embedded = false,
  backTo,
  backLabel,
  notice = "Vous consultez ce profil sans quitter votre espace dashboard.",
  maxWidth = "max-w-5xl",
}) {
  return (
    <div
      className={
        embedded
          ? "bg-slate-50/50 px-4 py-6 sm:px-6 lg:px-8"
          : "min-h-screen bg-slate-50/50 px-4 py-12 sm:px-6 lg:px-8"
      }
    >
      <div className={`mx-auto ${maxWidth}`}>
        {embedded && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-brand-100 bg-brand-50/70 px-4 py-3 text-sm text-brand-800 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
              <span>
                <strong className="font-semibold text-brand-900">
                  Lecture publique sécurisée.
                </strong>{" "}
                {notice}
              </span>
            </div>
          </div>
        )}

        {backTo && backLabel && (
          <Link
            to={backTo}
            className="group inline-flex items-center text-sm font-semibold text-slate-600 transition-colors hover:text-brand-700"
          >
            <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {backLabel}
          </Link>
        )}

        {children}
      </div>
    </div>
  );
}
