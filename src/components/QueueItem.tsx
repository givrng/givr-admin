import type { QueueItemProps } from "../types";

const statusClassMap = {
  Pending: "text-amber-700",
  Approved: "text-emerald-700",
  Flagged: "text-rose-700",
} as const;

export function QueueItem({ organization, isActive, onSelect }: QueueItemProps) {
  const label = organization.status[0].toUpperCase() + organization.status.slice(1);

  return (
    <button
      type="button"
      onClick={() => onSelect(organization.id)}
      className={`w-full rounded-lg border p-3 text-left transition-all border ${
        isActive
          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
          : "border-slate-200 bg-white hover:border-blue-300"
      }`}
    >
      <p className="font-semibold text-slate-900">{organization.name}</p>
      <p className={`text-sm ${statusClassMap[organization.status]}`}>
        {organization.id} · {label}
      </p>
    </button>
  );
}
