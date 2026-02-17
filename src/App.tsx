import { useMemo, useState } from "react";
import { CacDocumentPanel } from "./components/CacDocumentPanel";
import { ComparisonModal } from "./components/ComparisonModal";
import { ComparisonPanel } from "./components/ComparisonPanel";
import { MetricCard } from "./components/MetricCard";
import { QueueItem } from "./components/QueueItem";
import { ReviewActions } from "./components/ReviewActions";
import { initialOrganizations } from "./data/organizations";
import type { Organization, VerificationStatus } from "./types";

const statusBadgeClassMap: Record<VerificationStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  flagged: "bg-rose-100 text-rose-700",
};

function toStatusLabel(status: VerificationStatus): string {
  return status[0].toUpperCase() + status.slice(1);
}

export default function App() {
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
  const [selectedId, setSelectedId] = useState<string>(initialOrganizations[0].id);
  const [cmparisonModalOpen, setComparisonModalOpen] = useState(false);

  const selectedOrganization = useMemo(
    () => organizations.find((organization) => organization.id === selectedId) ?? null,
    [organizations, selectedId],
  );

  const metrics = useMemo(
    () => ({
      pending: organizations.filter((organization) => organization.status === "pending").length,
      approved: organizations.filter((organization) => organization.status === "approved").length,
      flagged: organizations.filter((organization) => organization.status === "flagged").length,
    }),
    [organizations],
  );

  const updateOrganizationStatus = (status: VerificationStatus): void => {
    setOrganizations((previousOrganizations) =>
      previousOrganizations.map((organization) => {
        if (organization.id !== selectedId) {
          return organization;
        }

        return {
          ...organization,
          status,
          reviewNote: organization.reviewNote?.trim()
            ? `${new Date().toLocaleDateString()} · ${toStatusLabel(status)}\n${organization.reviewNote}`
            : organization.reviewNote,
        };
      }),
    );
  };

  const updateNote = (nextNote: string): void => {
    setOrganizations((previousOrganizations) =>
      previousOrganizations.map((organization) =>
        organization.id === selectedId
          ? {
              ...organization,
              reviewNote: nextNote,
            }
          : organization,
      ),
    );
  };

  if (!selectedOrganization) {
    return null;
  }

  return (
    <>
      <section className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <MetricCard label="Pending Reviews" value={metrics.pending} />
        <MetricCard label="Approved" value={metrics.approved} />
        <MetricCard label="Flagged" value={metrics.flagged} />
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[320px_1fr]">
        <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-base font-semibold text-slate-900">Review Queue</h2>
            <span className="text-xs text-slate-500">Newest first</span>
          </div>
          <div className="grid gap-2">
            {organizations.map((organization) => (
              <QueueItem
                key={organization.id}
                organization={organization}
                isActive={organization.id === selectedId}
                onSelect={setSelectedId}
              />
            ))}
          </div>
        </aside>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-900">{selectedOrganization.name}</h2>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                statusBadgeClassMap[selectedOrganization.status]
              }`}
            >
              {toStatusLabel(selectedOrganization.status)}
            </span>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
            <ComparisonPanel title="Submitted Details" fields={selectedOrganization.submitted} />
            <CacDocumentPanel
              imageUrl={selectedOrganization.cacDocumentImageUrl}
              organizationName={selectedOrganization.name}
              onPreview={()=>{}}
            />
            <ComparisonModal isOpen={cmparisonModalOpen} onClose={()=>setComparisonModalOpen(false)} organization={selectedOrganization}/>            
            <button 
            className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white xl:col-span-2"
            onClick={()=>{
              setComparisonModalOpen(true)
              
            }}>View Document</button>
          </div>

          <ReviewActions
            note={selectedOrganization.reviewNote ?? ""}
            onNoteChange={updateNote}
            onApprove={() => updateOrganizationStatus("approved")}
            onFlag={() => updateOrganizationStatus("flagged")}
          />
        </section>
      </section>
    </>
  );
}
