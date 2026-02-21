import type { JSX } from "react";

export type VerificationStatus = "Pending" | "Approved" | "Rejected";
export type AdminRole = "SUPER_ADMIN" | "ADMIN";

export interface OrganizationFields {
  organizationName: string;
  address: string;
  cacRegNumber: string;
}
export interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'outline'| 'green'|'disabled'|'void'|'danger';
  onClick?: (E?:React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}
export interface Organization {
  id: string;
  name: string;
  submitted: OrganizationFields;
  cacDocumentImageUrl: string;
  status: VerificationStatus;
  reviewNote?: string;
}

export interface AuthUser {
  email: string;
  role: AdminRole;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
}

export interface AuthContextValue extends AuthState {
  login: (token: string) => void;
  logout: () => void;
}

export interface MetricCardProps {
  label: string;
  value: number;
  icon: JSX.Element;
  active:boolean;
  setActive: ()=>void;
}

export interface QueueItemProps {
  organization: Organization;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export interface SubmittedDetailsListProps {
  fields: OrganizationFields;
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
  onPreview: () => void;
}

export interface ComparisonModalProps {
  isOpen: boolean;
  organization: Organization ;
  onClose: () => void;
}

export interface ReviewActionsProps {
  note: string;
  onNoteChange: (nextValue: string) => void;
  onApprove: () => void;
  onFlag: () => void;
}

export interface LoginProps{
  email:string;
  otp:string;
}

export interface ReviewProps{
  reviewId:string;
  review:string;
  isApproved:boolean;
}