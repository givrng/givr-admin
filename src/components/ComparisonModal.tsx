import { useEffect } from "react";
import type { ComparisonModalProps } from "../types";
import { SubmittedDetailsList } from "./SubmittedDetailsList";

export function ComparisonModal({ isOpen, organization, onClose }: ComparisonModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeydown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !organization) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`CAC comparison modal for ${organization.name}`}
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-6xl overflow-auto rounded-2xl bg-white p-4 shadow-2xl sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-700">Document Comparison</p>
            <h3 className="text-lg font-semibold text-slate-900">{organization.name}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
          <section>
            <h4 className="mb-2 text-sm font-semibold text-slate-900">CAC Document Image</h4>
            <img
              src={organization.cacDocumentImageUrl}
              alt={`CAC registration document for ${organization.name}`}
              className="h-[65vh] w-full rounded-xl border border-slate-200 object-contain"
            />
          </section>
          <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="mb-3 text-sm font-semibold text-slate-900">Submitted Details</h4>
            <SubmittedDetailsList fields={organization.submitted} />
          </section>
        </div>
      </div>
    </div>
  );
}
