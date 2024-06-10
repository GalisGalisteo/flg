export const heardFrom = [
  "",
  "Facebook",
  "Instagram",
  "Buscador internet (Google...)",
  "Una amistat",
  "Un familiar",
  "Un altre",
] as const;

type HeardFrom = (typeof heardFrom)[number];

export interface Family {
  bankAccount: string;
  numberUsers: number;
  price: string;
  numberChildren: number;
  dateBirthChildren: string[];
  heardFrom: HeardFrom | null;
}
