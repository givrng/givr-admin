import type { ComparisonPanelProps } from "../types";
import { SubmittedDetailsList } from "./SubmittedDetailsList";

export function ComparisonPanel({ title, fields }: ComparisonPanelProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">{title}</h3>
      <SubmittedDetailsList fields={fields} />
    </article>
  );
}
