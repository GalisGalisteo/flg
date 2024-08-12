"use client";

import ProtectedRoute from "@/components/ProtectedRoutes";
import { gql, useQuery } from "@apollo/client";

export default function AdminPanel() {
  const LIST_FAMILY_ACCOUNT = gql`
    query ListFamilyAccounts {
      listFamilyAccounts {
        id
        foundingMemberExternalId
        members {
          id
          name
          surname
          birthDate
          email
          phone
          nif
          address {
            street
            streetNumber
            flatNumber
            postcode
            city
            district
            country
          }
          memberExternalId
          adminAssignatedId
        }
        bankAccount
        children
        agreements {
          agreement1
          agreement2
          agreement3
        }
        isActive
        activationDate
        inactivationDate
        howCognized
      }
    }
  `;

  const { loading, error, data } = useQuery(LIST_FAMILY_ACCOUNT);
  console.log("data admin panel", data);

  return (
    <ProtectedRoute>
      <div>AdminPanel</div>;
    </ProtectedRoute>
  );
}
