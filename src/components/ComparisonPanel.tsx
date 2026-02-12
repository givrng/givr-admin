import type { ComparisonPanelProps } from "../types";
import { SubmittedDetailsList } from "./SubmittedDetailsList";

export function ComparisonPanel({ title, fields }: ComparisonPanelProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">{title}</h3>
      <SubmittedDetailsList fields={fields} />
    </article>
  );
}
