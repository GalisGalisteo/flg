import { useMutation } from "@apollo/client";
import { Family } from "@/types/family";
import { updateFamilyProperties } from "@/graphql/mutations";
import { useState } from "react";

export const useUpdateFamily = (familyId: string | undefined) => {
  const [updateFamily] = useMutation(updateFamilyProperties);

  const fetchUpdateFamily = async (values: Family) => {
    try {
      const response = await updateFamily({
        variables: {
          familyAccountId: familyId,
          updateFamilyProperties: {
            ...values,
            // catResident:
            //   values.catResident === "1"
            //     ? true
            //     : values.catResident === "0"
            //     ? false
            //     : null,
          },
        },
      });

      if (response?.extensions?.statusCode === 200) {
        console.log("Family updated successfully:", response);
      }
    } catch (error) {}
  };

  return {
    fetchUpdateFamily,
  };
};
