export type VerificationStatus = "pending" | "approved" | "flagged";

export interface OrganizationFields {
  organizationName: string;
  address: string;
  cacRegNumber: string;
  contactEmail: string;
}

export interface Organization {
  id: string;
  name: string;
  submitted: OrganizationFields;
  cacDocumentImageUrl: string;
  status: VerificationStatus;
  reviewNote?: string;
}

export interface MetricCardProps {
  label: string;
  value: number;
}

export interface QueueItemProps {
  organization: Organization;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export interface ComparisonPanelProps {
  title: string;
  fields: OrganizationFields;
}
export interface ComparisonModalProps{ 
  isOpen: boolean;
  organization: Organization;
  onClose: ()=>void; 
}

export interface SubmittedDetailsListProps{
  fields: OrganizationFields;
}
export interface CacDocumentPanelProps {
  imageUrl: string;
  organizationName: string;
}

export interface ReviewActionsProps {
  note: string;
  onNoteChange: (nextValue: string) => void;
  onApprove: () => void;
  onFlag: () => void;
}
