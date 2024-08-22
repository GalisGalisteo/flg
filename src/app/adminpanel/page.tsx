"use client";

import AdminTable from "@/components/AdminTable";
import LoadingImage from "@/components/common/LoadingImage";
import Modal from "@/components/common/Modal";
import FamilyForm from "@/components/form/FamilyForm";
import ProtectedRoute from "@/components/common/ProtectedRoutes";
import { Family } from "@/types/family";
import { useQuery } from "@apollo/client";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { FaEdit, FaTrash, FaHome } from "react-icons/fa";
import { listFamilyAccount } from "@/graphql/mutations";

export default function AdminPanel() {
  const { loading, error, data } = useQuery(listFamilyAccount);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState();

  // Transform the data so that each member is a separate row
  const transformedData = useMemo(() => {
    if (!data) return [];
    return data.listFamilyAccounts.flatMap((family) =>
      family.members.map((member) => ({
        ...family,
        members: [member], // This is the individual member object
      }))
    );
  }, [data]);

  console.log("transformedData", transformedData);
  // Define columns
  const columns = useMemo<ColumnDef<Family>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Núm soci",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "foundingMemberExternalId",
        header: "Família",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.members[0].name,
        header: "Nom",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.members[0].surname,
        header: "Cognoms",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.members[0].birthDate,
        header: "Data de naixement",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.members[0].nif,
        header: "NIF/NIE/Passaport",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.members[0].email,
        header: "Correu electrònic",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.members[0].phone,
        header: "Telèfon",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) =>
          `${row.members[0].address.street}, ${row.members[0].address.streetNumber}`,
        id: "address",
        header: "Adreça",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.members[0].address.postcode,
        header: "Codi Postal",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.members[0].address.city,
        header: "Ciutat",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.members[0].address.district,
        header: "Districte",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.members[0].address.country,
        header: "País",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "bankAccount",
        header: "Compte bancari",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.children.length,
        header: "Núm. fills",
        cell: (info) => info.getValue(),
      },
      // change for the correct info
      {
        accessorKey: "isActive",
        header: "Pagament",
        cell: ({ getValue }) => (
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              getValue()
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {getValue() ? "Fet" : "Pendent"}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Edició",
        cell: (row) => (
          <div className="flex space-x-2">
            <button className="text-green-600 hover:text-green-900">
              <FaHome />
            </button>
            <button
              className="text-orange-600 hover:text-orange-900"
              onClick={() => {
                // const member = { members: [row.row.original.member] };
                console.log("row.row.original", row.row.original);
                return handleEdit(row.row.original);
              }}
            >
              <FaEdit />
            </button>
            <button className="text-red-600 hover:text-red-900">
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const handleEdit = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  return (
    <ProtectedRoute>
      <div>AdminPanel</div>
      {error && !loading ? <p>An error ocurred: {error.message}</p> : null}
      {!loading && data ? (
        <>
          <AdminTable columns={columns} data={transformedData} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <FamilyForm data={selectedMember} adminpanel disabled />
          </Modal>
        </>
      ) : (
        <div className="flex justify-center items-center h-[500px]">
          <LoadingImage />
        </div>
      )}
    </ProtectedRoute>
  );
}
