import { useMutation } from "@apollo/client";
import { Family } from "@/types/family";
import { updateFamilyProperties } from "@/graphql/mutations";

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
