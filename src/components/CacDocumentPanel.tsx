import type { CacDocumentPanelProps } from "../types";

export function CacDocumentPanel({ imageUrl, organizationName, onPreview }: CacDocumentPanelProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 w-full">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">CAC Document</h3>
      <button
        type="button"
        onClick={onPreview}
        className="block w-full rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <img
          src={imageUrl}
          alt={`CAC registration document for ${organizationName}`}
          className="h-64 w-full rounded-lg border border-slate-200 object-cover"
        />
      </button>
      <p className="mt-3 text-sm text-slate-500">
        Click the document to open a full-screen comparison with submitted details.
      </p>
    </article>
  );
}
