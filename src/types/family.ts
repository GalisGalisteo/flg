export const howCognized = [
  "Facebook",
  "Instagram",
  "Buscador internet (Google...)",
  "Una amistat",
  "Un familiar",
  "Un altre",
] as const;

type HowCognized = "" | (typeof howCognized)[number];

interface Member {
  id?: string;
  name: string;
  surname: string;
  birthDate: string;
  email: string | null;
  nif: string;
  phone: string;
  address: {
    street: string;
    streetNumber: string;
    flatNumber: string;
    postcode: string;
    city: string;
    district: string;
    country: string;
  };
  memberExternalId?: string;
  adminAssignatedId?: string;
}

export interface Family {
  id?: string;
  foundingMemberExternalId?: string;
  members: Member[];
  bankAccount: string;
  numberUsers: number;
  price: string;
  numberChildren: number; // not in query GetFamilyAccount
  children: string[];
  agreements: {
    agreement1: boolean;
    agreement2: boolean;
    agreement3: boolean;
  };
  isActive?: boolean;
  activationDate?: string;
  inactivationDate?: string;
  howCognized: HowCognized;
  catResident: boolean | null | string;
}
