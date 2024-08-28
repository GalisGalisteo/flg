import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { Family } from "@/types/family";
import { createFamilyAccount } from "@/graphql/mutations";
import { useState } from "react";

export const useCreateFamily = () => {
  const router = useRouter();
  const [createFamily] = useMutation(createFamilyAccount);

  const formatMemberData = (members: Family["members"]) => {
    return members.map((member) => ({
      name: member.name,
      surname: member.surname,
      birthDate: member.birthDate,
      email: member.email,
      phone: member.phone,
      nif: member.nif,
      address: {
        street: member.address.street,
        streetNumber: member.address.streetNumber,
        postcode: member.address.postcode,
        city: member.address.city,
        country: member.address.country,
        flatNumber: member.address.flatNumber,
        district: member.address.district,
      },
    }));
  };

  const formatFamilyData = (values: Family) => {
    return {
      bankAccount: values.bankAccount,
      children: values.children,
      agreements: values.agreements,
      howCognized: values.howCognized,
      // catResident:
      //   values.catResident === "1"
      //     ? true
      //     : values.catResident === "0"
      //     ? false
      //     : null,
    };
  };

  const fetchCreateFamily = async (values: Family) => {
    try {
      const memberData = formatMemberData(values.members);
      const familyData = formatFamilyData(values);

      const response = await createFamily({
        variables: {
          members: memberData,
          familyData: familyData,
          expectedMembers: values.numberUsers.toString(),
        },
      });

      if (response?.extensions?.statusCode === 200) {
        router.push("/");
      }
    } catch (error) {}
  };

  return {
    fetchCreateFamily,
  };
};
