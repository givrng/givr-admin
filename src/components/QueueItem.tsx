import type { QueueItemProps } from "../types";

const statusClassMap = {
  pending: "text-amber-700",
  approved: "text-emerald-700",
  flagged: "text-rose-700",
} as const;

export function QueueItem({ organization, isActive, onSelect }: QueueItemProps) {
  const label = organization.status[0].toUpperCase() + organization.status.slice(1);

  return (
    <button
      type="button"
      onClick={() => onSelect(organization.id)}
      className={`w-full rounded-lg border p-3 text-left transition ${
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
