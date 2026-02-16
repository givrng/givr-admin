import type { OrganizationFields, SubmittedDetailsListProps } from "../types";

const fieldLabels: Record<keyof OrganizationFields, string> = {
  organizationName: "Organization Name",
  address: "Address",
  cacRegNumber: "CAC Registration Number",
  contactEmail: "Contact Email",
};

export function SubmittedDetailsList({ fields }: SubmittedDetailsListProps) {
  return (
    <dl className="space-y-3 text-sm sm:space-y-0">
      {(Object.keys(fieldLabels) as Array<keyof OrganizationFields>).map((key) => (
        <div
          key={key}
          className="grid grid-cols-1 gap-1 border-b border-slate-100 pb-3 last:border-none last:pb-0 sm:grid-cols-[160px_1fr] sm:gap-x-3 sm:gap-y-2 sm:pb-2"
        >
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 sm:text-sm sm:normal-case sm:tracking-normal">
            {fieldLabels[key]}
          </dt>
          <dd className="m-0 break-words font-medium text-slate-800">{fields[key]}</dd>
        </div>
      ))}
    </dl>
  );
}
