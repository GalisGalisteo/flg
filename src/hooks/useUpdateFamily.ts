import { useMutation } from "@apollo/client";
import { updateFamilyProperties, updateMember } from "@/graphql/mutations";
import { Family, Member } from "@/types/family";

export const useUpdateFamily = (familyId: string | undefined) => {
  const [updateFamily] = useMutation(updateFamilyProperties);
  const [updateMemberData] = useMutation(updateMember);

  const fetchUpdateFamily = async (values: any, isMember?: boolean | null) => {
    const familyValues = {
      bankAccount: values.bankAccount,
      children: values.children,
      agreements: values.agreements,
      foundingMemberExternalId: values.foundingMemberExternalId || "1",
      isActive: values.isActive || false,
      activationDate: values.activationDate,
      inactivationDate: values.inactivationDate,
    };

    // const memberValues = {
    //   id: values.members[0].id || "b3e43dc5-fbfc-412a-bd57-e8c6c4584fd4",
    //   name: values.members[0].name,
    //   surname: values.members[0].surname,
    //   birthDate: values.members[0].birthDate,
    //   email: values.members[0].email,
    //   phone: values.members[0].phone,
    //   nif: values.members[0].nif,
    //   address: {
    //     street: values.members[0].address.street,
    //     streetNumber: values.members[0].address.streetNumber,
    //     postcode: values.members[0].address.postcode,
    //     city: values.members[0].address.city,
    //     country: values.members[0].address.country,
    //     flatNumber: values.members[0].address.flatNumber,
    //     district: values.members[0].address.district,
    //   },
    //   memberExternalId: values.members[0].memberExternalId,
    //   adminAssignatedId: values.members[0].adminAssignatedId,
    // };
    // console.log("🚀 ~ useUpdateFamily ~ memberValues:", memberValues);

    try {
      let response;
      if (isMember) {
        response = await updateMemberData({
          variables: {
            familyAccountId: familyId,
            updatedMember: values.members,
          },
        });
      } else {
        response = await updateFamily({
          variables: {
            familyAccountId: familyId,
            updatedFamilyProperties: familyValues,
            // catResident:
            //   values.catResident === "1"
            //     ? true
            //     : values.catResident === "0"
            //     ? false
            //     : null,
          },
        });
      }
      if (response?.extensions?.statusCode === 200) {
        return { success: true, message: "Family updated successfully" };
      } else {
        return { success: false, message: "Family update failed" };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: "Family creation failed" };
    }
  };

  return {
    fetchUpdateFamily,
  };
};
