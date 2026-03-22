import type { JSX } from "react";

export type ReviewStatus = "Pending" | "Approved" | "Rejected";
export type AdminRole = "SUPER_ADMIN" | "ADMIN";
export type IdType =  "DL"|"vNIN"|"VOTER_CARD"|"PASSPORT"
export type VerificationStatus = "VERIFIED" | "UNVERIFIED" | "AUTOMATIC_VERIFICATION_FAILED" | "AUTOMATIC_VERIFICATION_SUCCEEDED"|"AUTOMATIC_VERIFICATION_PENDING"|"PENDING";
export interface OrganizationFields {
  organizationName: string;
  address: string;
  cacRegNumber: string;

  idNumber:string;
  idType: IdType;
  contactFullName:string;
  contactDateOfBirth:string;
  verificationStatus:string;
  remark:string;
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
  reviewStatus: ReviewStatus;
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