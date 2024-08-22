import { Family, HowCognized } from "@/types/family";

export function initializeFormValues(data?: Family, userEmail?: string | null) {
  return {
    members: data?.members.map((member) => ({
      name: member.name || "",
      surname: member.surname || "",
      birthDate: member.birthDate || "",
      email: member.email || userEmail || "",
      nif: member.nif || "",
      phone: member.phone || "",
      address: {
        street: member.address.street || "",
        streetNumber: member.address.streetNumber || "",
        postcode: member.address.postcode || "",
        city: member.address.city || "",
        flatNumber: member.address.flatNumber || "",
        district: member.address.district || "",
        country: member.address.country || "",
      },
    })) || [
      {
        name: "",
        surname: "",
        birthDate: "",
        email: userEmail || "",
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
      },
    ],
    catResident:
      data?.catResident === true
        ? "1"
        : data?.catResident === false
        ? "0"
        : "" || "",
    bankAccount: data?.bankAccount || "",
    numberUsers: data?.numberUsers || 1,
    price: "0",
    numberChildren: data?.children.length || 0,
    children: data?.children || [],
    howCognized: (data?.howCognized as HowCognized) || "",
    agreements: {
      agreement1: data?.agreements.agreement1 || false,
      agreement2: data?.agreements.agreement2 || false,
      agreement3: data?.agreements.agreement3 || false,
    },
  };
}
