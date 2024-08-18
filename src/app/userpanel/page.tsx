"use client";

import LoadingImage from "@/components/common/LoadingImage";
import RegistrationForm from "@/components/form/RegistrationForm";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { Family } from "@/types/family";
import { gql, useQuery } from "@apollo/client";

export default function UserPanel() {
  const getFamilyAccount = gql`
    query GetFamilyAccount {
      getFamilyAccount {
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

  interface FamilyQuery {
    getFamilyAccount: Family;
  }

  const { loading, error, data } = useQuery<FamilyQuery>(getFamilyAccount);
  const name = data?.getFamilyAccount.members[0].name;

  return (
    <ProtectedRoute>
      <div className="max-w-screen-sm mx-auto space-y-2 mb-10">
        <div className="text-center space-y-3 p-5">
          <h1 className="text-xl">
            Hola <span className="text-2xl font-semibold">{name}</span>!
          </h1>
          <p className="text-lg">
            A continuació tens les teves dades i les de la teva familia:
          </p>
        </div>
        {error && !loading ? <p>An error ocurred: {error.message}</p> : null}
        {!loading && data ? (
          <RegistrationForm data={data.getFamilyAccount} userpanel disabled />
        ) : (
          <div className="flex justify-center items-center h-[500px]">
            <LoadingImage />
          </div>
        )}
        <div className="text-center space-y-3 p-5">
          <p>
            Si necessiteu modificar les dades, donar-se de baixa o afegir a un
            altra persona socia a la vostra familia, heu de enviar un mail amb
            el vostre número de soci a:
          </p>
          <p className="font-bold">
            <a href="mailto:familieslg@familieslg.org">
              familieslg@familieslg.org
            </a>
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}

const testData = {
  __typename: "FamilyAccount",
  id: "d3ad6e03-a3c4-4b76-a874-21ba9a4f9d2e",
  foundingMemberExternalId: "2a2a222a-c5f4-4c38-b08b-f257ed3750cc",
  members: [
    {
      __typename: "Member",
      id: "64238fa1-35c7-4c2f-bd90-5778b07d7066",
      name: "Test",
      surname: "Test",
      birthDate: "2024-08-08",
      email: "member@op.pl",
      phone: "123123455",
      nif: "123124134",
      address: {
        __typename: "Address",
        street: "fbesfb",
        streetNumber: "3",
        flatNumber: "1",
        postcode: "12312",
        city: "fgber",
        district: "rege",
        country: "ger",
      },
      memberExternalId: "2a2a222a-c5f4-4c38-b08b-f257ed3750cc",
      adminAssignatedId: null,
    },
    {
      __typename: "Member",
      id: "74857eb5-4c37-489f-9f56-6768d9d1b7f2",
      name: "Jane",
      surname: "Doe",
      birthDate: "1990-05-15",
      email: "jane.doe@example.com",
      phone: "987654321",
      nif: "AB123456C",
      address: {
        __typename: "Address",
        street: "Main Street",
        streetNumber: "12",
        flatNumber: "2B",
        postcode: "90210",
        city: "Los Angeles",
        district: "California",
        country: "USA",
      },
      memberExternalId: "4b4b444b-c9f4-4c38-b08b-f257ed3750cd",
      adminAssignatedId: null,
    },
  ],
  bankAccount: "ergergergeg",
  children: ["2024-08-17"],
  agreements: {
    __typename: "Agreements",
    agreement1: true,
    agreement2: true,
    agreement3: true,
  },
  isActive: false,
  activationDate: null,
  inactivationDate: null,
  howCognized: "Facebook",
};
