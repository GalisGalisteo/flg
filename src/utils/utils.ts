import { Member } from "@/types/family";

export const birthDate18 = new Date(
  new Date().getFullYear() - 18,
  new Date().getMonth(),
  new Date().getDate()
);

export function calculatePrice(
  catResident: string | boolean | null,
  numberUsers: number,
  prices?: { cataloniaBased: string; outsideCatalonia: string }
): string {
  let price = 0;

  if (catResident === "1") {
    price = Number(prices?.cataloniaBased) * numberUsers;
  } else if (catResident === "0") {
    price = Number(prices?.outsideCatalonia) * numberUsers;
  }

  return `${price.toFixed(2)} €`;
}

export function updateMembers(members: Member[], numberUsers: number) {
  let newMembers = [...members];

  if (numberUsers > members.length) {
    for (let i = members.length; i < numberUsers; i++) {
      newMembers.push({
        name: "",
        surname: "",
        birthDate: "",
        email: "",
        nif: "",
        phone: "",
        address: {
          street: "",
          streetNumber: "",
          postcode: "",
          city: "",
          flatNumber: "",
          district: "",
          country: "",
        },
      });
    }
  } else if (numberUsers < members.length) {
    newMembers = members.slice(0, numberUsers);
  }

  return newMembers;
}
