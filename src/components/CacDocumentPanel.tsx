import type { CacDocumentPanelProps } from "../types";

export function CacDocumentPanel({ imageUrl, organizationName }: CacDocumentPanelProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">CAC Document</h3>
      <img
        src={imageUrl}
        alt={`CAC registration document for ${organizationName}`}
        className="h-64 w-full rounded-lg border border-slate-200 object-cover"
      />
      <p className="mt-3 text-sm text-slate-500">
        Use the image to verify submitted details and confirm document authenticity.
      </p>
    </article>
  );
}
