import type { Organization } from "../types";

export const initialOrganizations: Organization[] = [
  {
    id: "ORG-3221",
    name: "Helping Hands Initiative",
    submitted: {
      organizationName: "Helping Hands Initiative",
      address: "18 Idowu Taylor Street, Victoria Island, Lagos",
      cacRegNumber: "RC-902144",
      contactEmail: "compliance@helpinghands.ng",
    },
    cacDocumentImageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    status: "pending",
  },
  {
    id: "ORG-3215",
    name: "Clean Earth Foundation",
    submitted: {
      organizationName: "Clean Earth Foundation",
      address: "5 Murtala Muhammed Way, Kano",
      cacRegNumber: "RC-773018",
      contactEmail: "admin@cleanearth.org",
    },
    cacDocumentImageUrl:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    status: "approved",
  },
  {
    id: "ORG-3209",
    name: "Future Skills Trust",
    submitted: {
      organizationName: "Future Skills Trust",
      address: "41 Circular Road, Port Harcourt",
      cacRegNumber: "RC-667145",
      contactEmail: "ops@futureskills.org",
    },
    cacDocumentImageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    status: "flagged",
  },
];
