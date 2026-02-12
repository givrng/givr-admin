import type { ReviewActionsProps } from "../types";

export function ReviewActions({
  note,
  onNoteChange,
  onApprove,
  onFlag,
}: ReviewActionsProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">Review Notes</h3>
      <textarea
        value={note}
        onChange={(event) => onNoteChange(event.target.value)}
        rows={4}
        placeholder="Add findings from document checks, signature validation, and address verification..."
        className="w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-800 outline-none ring-blue-200 focus:ring"
      />
      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={onFlag}
          className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700"
        >
          Flag mismatch
        </button>
        <button
          type="button"
          onClick={onApprove}
          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white"
        >
          Approve organization
        </button>
      </div>
    </article>
  );
}
