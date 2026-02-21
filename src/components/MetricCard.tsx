
import type { MetricCardProps } from "../types";

export function MetricCard({ label, value, icon, active, setActive }: MetricCardProps) {
  return (
    <button className={`p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 ${active? "bg-blue-100 text-white": "bg-white"}`}
      onClick={setActive}
    >
      <div className="p-3 bg-amber-50 rounded-lg">{icon}</div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <strong className="text-2xl text-slate-900">{value}</strong>
      </div>
    </button>
  );
}
