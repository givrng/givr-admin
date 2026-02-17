import type { ComparisonPanelProps } from "../types";

const fieldLabels: Record<keyof ComparisonPanelProps["fields"], string> = {
  organizationName: "Organization Name",
  address: "Address",
  cacRegNumber: "CAC Registration Number",
  contactEmail: "Contact Email",
};

export function ComparisonPanel({ title, fields }: ComparisonPanelProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">{title}</h3>
      <dl className="grid grid-cols-[150px_1fr] gap-y-2 gap-x-3 text-sm">
        {(Object.keys(fieldLabels) as Array<keyof typeof fieldLabels>).map((key) => (
          <div key={key} className="contents">
            <dt className="text-slate-500">{fieldLabels[key]}</dt>
            <dd className="font-medium text-slate-800 text-wrap: pretty">{fields[key]}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
