import type { OrganizationFields, SubmittedDetailsListProps } from "../types";

const fieldLabels: Record<keyof OrganizationFields, string> = {
  organizationName: "Organization Name",
  address: "Address",
  cacRegNumber: "CAC Registration Number",
  contactEmail: "Contact Email",
};

export function SubmittedDetailsList({ fields }: SubmittedDetailsListProps) {
  return (
    <dl className="grid grid-cols-[150px_1fr] gap-y-2 gap-x-3 text-sm">
      {(Object.keys(fieldLabels) as Array<keyof OrganizationFields>).map((key) => (
        <div key={key} className="contents">
          <dt className="text-slate-500">{fieldLabels[key]}</dt>
          <dd className="font-medium text-slate-800">{fields[key]}</dd>
        </div>
      ))}
    </dl>
  );
}
