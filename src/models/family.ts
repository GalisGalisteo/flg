export const howCognized = [
  "",
  "Facebook",
  "Instagram",
  "Buscador internet (Google...)",
  "Una amistat",
  "Un familiar",
  "Un altre",
] as const;

type HeardFrom = (typeof howCognized)[number];

export interface Family {
  bankAccount: string;
  numberUsers: number;
  price: string;
  numberChildren: number;
  dateBirthChildren: string[];
  howCognized: HeardFrom | null;
  agreements: {
    agreement1: boolean;
    agreement2: boolean;
    agreement3: boolean;
  };
}
