import { useMutation } from "@apollo/client";
import { Family } from "@/types/family";
import { createFamilyAccount } from "@/graphql/mutations";

export const useCreateFamily = () => {
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
        return { success: true, message: "Family created successfully" };
      } else {
        return { success: false, message: "Family creation failed" };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: "Family creation failed" };
    }
  };

  return {
    fetchCreateFamily,
  };
};
