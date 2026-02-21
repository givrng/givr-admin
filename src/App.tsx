import { useEffect, useMemo, useState } from "react";
import { CacDocumentPanel } from "./components/CacDocumentPanel";
import { ComparisonModal } from "./components/ComparisonModal";
import { ComparisonPanel } from "./components/ComparisonPanel";
import { MetricCard } from "./components/MetricCard";
import { QueueItem } from "./components/QueueItem";
import { ReviewActions } from "./components/ReviewActions";

import type { Organization, VerificationStatus } from "./types";
import useAuthFetch from "./hooks/useAuthFetch";
import { PageLoader } from "./icon/icons";
import { LucideClock, LucideInbox, LucideRefreshCcw, LucideShieldAlert, LucideShieldCheck } from 'lucide-react';
import { useConfirmAsk } from "./hooks/useConfirm";

const statusBadgeClassMap: Record<VerificationStatus, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Approved: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-rose-100 text-rose-700",
};

function toStatusLabel(status: VerificationStatus): string {
  return status[0].toUpperCase() + status.slice(1);
}

export default function App() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [cmparisonModalOpen, setComparisonModalOpen] = useState(false);
  const {confirmAsk, ConfirmDialog} = useConfirmAsk()
  const [filter, setFilter] = useState<VerificationStatus>("Pending")
  const [isLoading, setIsLoading] = useState(false)
  let [refreshList, setRefreshList] = useState(false);
  const {API} = useAuthFetch()

  const refresh = ()=>{
    setRefreshList(!refreshList)
  }
  useEffect( ()=>{

    const fetchOrganizations = async ()=>{
    try{
      setIsLoading(true)
      let response = await API().get("") 
      setOrganizations(
      response.data.map((org: any) => ({
        ...org,
        id: String(org.id),
      }))
    );
    }catch{
      // setOrganizations(initialOrganizations)
    }finally{
      setIsLoading(false)
    }
    }

    fetchOrganizations()
  }, [refreshList])

 
  useEffect(()=>{
    setSelectedId("")
  }, [filter])

  const selectedOrganization = useMemo(
    () => organizations.find((organization) => organization.id === selectedId) ?? null,
    [organizations, selectedId],
  );

  const metrics = useMemo(
    () => ({
      pending: organizations.filter((organization) => organization.status === "Pending").length,
      approved: organizations.filter((organization) => organization.status === "Approved").length,
      flagged: organizations.filter((organization) => organization.status === "Rejected").length,
    }),
    [organizations],
  );

  const filteredOrganizations: Organization[] = useMemo(()=>organizations.filter(p=>p.status == filter), [filter, organizations])

  const updateOrganizationStatus = (status: VerificationStatus): void => {
    setOrganizations((previousOrganizations) =>
      previousOrganizations.map((organization) => {
        if (organization.id !== selectedId) {
          return organization;
        }

        return {
          ...organization,
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

  const EmptyState:React.FC<{
    title:string,
    message:string,
    onRetry:()=>void,
    isLoading: boolean
  }> = ({message, title, isLoading, onRetry}) => (
  <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 min-h-[400px]">
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 scale-150"></div>
      <LucideInbox className="relative w-16 h-16 text-slate-400 mx-auto" />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
      {message}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        disabled={isLoading}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 shadow-sm disabled:opacity-50"
      >
        <LucideRefreshCcw
        className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        Refresh Queue
      </button>
    )}
  </div>
);

  const handleReview = async (isApproved:boolean)=>{
    const response = await confirmAsk({
      question: "Are you sure you want to carry out this action?",
      falseAnswer: "Cancel",
      trueAnswer: "Proceed"
    })
    try{
      setIsLoading(true)
      if(response){
        await API().post("/review", {
        isApproved: isApproved,
        sessionId: selectedId,
        reason: selectedOrganization?.reviewNote
      })
      setRefreshList(!refreshList)
      }      
     
    }finally{
      setIsLoading(false)
    }
  }

  const handleAccept =  ()=>{
     handleReview(true)
  }

  const handleReject = ()=>{
     handleReview(false)
  }

  const handleSetActive = (status:VerificationStatus)=>{
    setFilter(status)
  }
  if (!organizations) {
    return <EmptyState message="There are no pending verifications" 
      isLoading= {isLoading} onRetry={refresh} title="Organization Verification"/>;
  }

  return (
    <>
      {isLoading && <PageLoader/>}
      <ConfirmDialog/>
      <section className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <MetricCard active={filter == "Pending"} setActive={()=>handleSetActive("Pending")} icon={<LucideClock className="text-amber-600 w-5 h-5"/>}  label="Pending" value={metrics.pending} />
        <MetricCard active={filter == "Approved"} setActive={()=>handleSetActive("Approved")} icon={<LucideShieldCheck className="text-emerald-600 w-5 h-5"/>} label="Approved" value={metrics.approved} />
        <MetricCard active={filter == "Rejected"} setActive={()=>handleSetActive("Rejected")} icon={<LucideShieldAlert className="text-rose-600 w-5 h-5"/>} label="Flagged" value={metrics.flagged} />

      </section>

      <section className="grid grid-cols-1 gap-4 w-full">
        <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm ">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-base font-semibold text-slate-900">Review Queue</h2>
            <span className="text-xs text-slate-500">Newest first</span>
          </div>
          <div className="space-y-2">
            {filteredOrganizations.map((organization) => (
              <QueueItem
                key={organization.id}
                organization={organization}
                isActive={organization.id === selectedId}
                onSelect={setSelectedId}
              />
            ))}
          </div>
        </aside>

        <main className="">
        {selectedOrganization && <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm ">
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900">{selectedOrganization.name}</h2>
            <span
              className={`rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wide ${
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
              onPreview={()=>setComparisonModalOpen(true)}
            />
            <ComparisonModal isOpen={cmparisonModalOpen} onClose={()=>setComparisonModalOpen(false)} organization={selectedOrganization}/>            
           
          </div>

          <ReviewActions
            note={selectedOrganization.reviewNote ?? ""}
            onNoteChange={updateNote}
            onApprove={() => {
              updateOrganizationStatus("Approved")
              handleAccept()
            }}
            onFlag={() => {
              updateOrganizationStatus("Rejected")
              handleReject()
            }}
          />
        </section>}
        </main>
      </section>
    </>
  );
}
