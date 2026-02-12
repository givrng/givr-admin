import type { MetricCardProps } from "../types";

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <strong className="text-2xl text-slate-900">{value}</strong>
    </article>
  );
}
