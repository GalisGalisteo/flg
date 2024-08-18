"use client";

import { Family, howCognized } from "@/types/family";
import { Form, Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import FieldForm from "./FieldForm";
import { Button } from "../Button";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { registrationSchema } from "./RegistrationSchema";
import ChildrenFieldArray from "./ChildrenFieldArray";

const createFamilyAccount = gql`
  mutation (
    $members: [MemberData]
    $familyData: FamilyData
    $expectedMembers: String
  ) {
    createFamilyAccount(
      members: $members
      familyData: $familyData
      expectedMembers: $expectedMembers
    ) {
      familyId
    }
  }
`;

const updateFamilyProperties = gql`
  mutation (
    $familyAccountId: String
    $updatedFamilyProperties: UpdatedFamilyProperties
  ) {
    updateFamilyProperties(
      familyAccountId: $familyAccountId
      updatedFamilyProperties: $updatedFamilyProperties
    ) {
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

interface RegistrationFormProps {
  userEmail?: string | null;
  data?: Family;
  disabled?: boolean;
  userpanel?: boolean;
  adminpanel?: boolean;
  prices?: {
    cataloniaBased: string;
    outsideCatalonia: string;
  };
}

export default function RegistrationForm({
  userEmail,
  data,
  disabled = false,
  userpanel = false,
  adminpanel = false,
  prices,
}: RegistrationFormProps) {
  const [isDisabled, setIsDisabled] = useState(disabled);
  const [createFamily] = useMutation(createFamilyAccount);
  const [updateFamily] = useMutation(updateFamilyProperties);

  const router = useRouter();

  const initialValues: Family = useMemo(() => {
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
      howCognized: data?.howCognized || "",
      agreements: {
        agreement1: data?.agreements.agreement1 || false,
        agreement2: data?.agreements.agreement2 || false,
        agreement3: data?.agreements.agreement3 || false,
      },
    };
  }, [data, userEmail]);

  const fetchCreateFamily = async (values: Family) => {
    try {
      const memberData = values.members.map((member) => ({
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

      const familyData = {
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
      console.log("🚀 ~ fetchCreateFamily ~ familyData:", familyData);

      const response = await createFamily({
        variables: {
          members: memberData,
          familyData: familyData,
          expectedMembers: values.numberUsers.toString(),
        },
      });
      const statusCode = response.extensions?.statusCode;
      if (statusCode === 200) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUpdateFamily = async (values: Family) => {
    try {
      const response = await updateFamily({
        variables: {
          familyAccountId: data?.id,
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
      const statusCode = response.extensions?.statusCode;
      if (statusCode === 200) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={registrationSchema}
        validateOnChange
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          setIsDisabled(true);
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => {
          // adding members
          if (values.numberUsers > values.members.length) {
            const newMembers = [...values.members];
            for (let i = values.members.length; i < values.numberUsers; i++) {
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
            setFieldValue("members", newMembers);
          } else if (values.numberUsers < values.members.length) {
            // Removing members
            const newMembers = values.members.slice(0, values.numberUsers);
            setFieldValue("members", newMembers);
          }
          useEffect(() => {
            let price = 0;

            if (values.catResident === "1") {
              price = Number(prices?.cataloniaBased) * values.numberUsers;
            } else if (values.catResident === "0") {
              price = Number(prices?.outsideCatalonia) * values.numberUsers;
            }

            setFieldValue("price", `${price.toFixed(2)} €`);
          }, [values.catResident, values.numberUsers, prices]);

          return (
            <Form
              className={clsx(
                "flex flex-col gap-3 p-5 rounded-xl",
                isDisabled && !adminpanel
                  ? "sm:bg-white sm:bg-opacity-50"
                  : null
              )}
            >
              {values.members.map((_, index) => (
                <div key={index}>
                  <h3 className="text-center text-xl">
                    Dades personals{" "}
                    {values.members.length > 1 ? (
                      <span>
                        del {index + 1}
                        <span className="align-super text-sm">
                          {index + 1 === 1
                            ? "er"
                            : index + 1 === 2
                            ? "on"
                            : index + 1 === 3
                            ? "er"
                            : index + 1 === 4
                            ? "er"
                            : "è"}
                        </span>{" "}
                        membre
                      </span>
                    ) : null}
                  </h3>
                  <FieldForm
                    name={`members[${index}].name`}
                    labelName="Nom"
                    type="text"
                    placeholder="Nom"
                    disabled={isDisabled}
                  />
                  <FieldForm
                    name={`members[${index}].surname`}
                    labelName="Cognoms"
                    type="text"
                    placeholder="Primer i Segon Cognom"
                    disabled={isDisabled}
                  />
                  <div className="sm:flex gap-3">
                    <FieldForm
                      name={`members[${index}].birthDate`}
                      labelName="Data de naixement"
                      type="date"
                      disabled={isDisabled}
                    />
                    <FieldForm
                      name={`members[${index}].nif`}
                      labelName="DNI/NIE/Passaport"
                      type="text"
                      disabled={isDisabled}
                      placeholder="12345678A"
                    />
                  </div>
                  <div className="sm:flex gap-3">
                    <FieldForm
                      name={`members[${index}].email`}
                      labelName="Correu electrònic"
                      type="email"
                      disabled={!isDisabled && index > 0 ? false : true}
                    />
                    <FieldForm
                      name={`members[${index}].phone`}
                      labelName="Telèfon mòbil"
                      type="tel"
                      disabled={isDisabled}
                      placeholder="+34612345678"
                    />
                  </div>
                  <FieldForm
                    name={`members[${index}].address.street`}
                    labelName="Adreça"
                    type="text"
                    disabled={isDisabled}
                    placeholder="Carrer, avinguda, passeig..."
                  />
                  <div className="sm:flex gap-3">
                    <FieldForm
                      name={`members[${index}].address.streetNumber`}
                      labelName="Número"
                      type="text"
                      disabled={isDisabled}
                      placeholder="123A"
                    />
                    <FieldForm
                      name={`members[${index}].address.flatNumber`}
                      labelName="Pis i porta"
                      type="text"
                      disabled={isDisabled}
                      placeholder="1-2"
                    />
                    <FieldForm
                      name={`members[${index}].address.postcode`}
                      labelName="Codi postal"
                      type="text"
                      disabled={isDisabled}
                      placeholder="08000"
                    />
                  </div>
                  <div className="sm:flex gap-3">
                    <FieldForm
                      name={`members[${index}].address.city`}
                      labelName="Població"
                      type="text"
                      disabled={isDisabled}
                      placeholder="Ciutat, poble..."
                    />
                    {index === 0 && (
                      <FieldForm
                        name="catResident"
                        labelName="Ets resident a Catalunya?"
                        type="select"
                        disabled={isDisabled}
                      >
                        <option value="">--Selecciona--</option>
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                      </FieldForm>
                    )}
                  </div>
                  <div className="sm:flex gap-3">
                    <FieldForm
                      name={`members[${index}].address.district`}
                      labelName="Comunitat Autònoma"
                      type="text"
                      disabled={isDisabled}
                      placeholder="Comunitat Autònoma"
                    />
                    <FieldForm
                      name={`members[${index}].address.country`}
                      labelName="Païs"
                      type="text"
                      disabled={isDisabled}
                      placeholder="Païs"
                    />
                  </div>
                </div>
              ))}
              <h3 className="text-center text-xl">Dades de la família</h3>
              <div className="sm:grid grid-cols-4 gap-3 items-center">
                <FieldForm
                  name="numberUsers"
                  labelName="Persones sòcies"
                  type="select"
                  disabled={isDisabled}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </FieldForm>
                <FieldForm
                  name="price"
                  labelName="Preu quota anual"
                  type="text"
                  disabled
                  // needs to calculate price
                />
                <FieldForm
                  className="col-span-2"
                  name="howCognized"
                  labelName="Com has arribat a nosaltres?"
                  type="select"
                  disabled={isDisabled}
                >
                  <option value="">--Selecciona--</option>
                  {howCognized.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </FieldForm>
              </div>

              <div className="sm:grid grid-cols-3 gap-3">
                <FieldForm
                  className="col-span-2"
                  name="bankAccount"
                  labelName="IBAN"
                  type="text"
                  placeholder="IBAN"
                  disabled={isDisabled}
                />
                <FieldForm
                  name="numberChildren"
                  labelName="Nombre de criatures"
                  type="number"
                  disabled={isDisabled}
                />
              </div>
              <ChildrenFieldArray isDisabled={isDisabled} />
              <FieldForm
                name="agreements.agreement1"
                labelName="Accepto que FLG tracti les meves dades seguint la llei vigent i
                el Reglament General de Protecció de Dades. Accepto que FLG
                m'enviï informació per correu electrònic o postal i pugui
                comunicar-se amb mi mitjançant els canals de comunicació que
                consideri oportuns. A més, entenc que tinc dret a cancel·lar,
                eliminar, rectificar o limitar aquestes dades en qualsevol
                moment, sempre que ho faci per escrit."
                type="checkbox"
                disabled={isDisabled}
              />
              <FieldForm
                name="agreements.agreement2"
                labelName="Accepto explícitament que si ens donem de baixa ho sol·licitarem per escrit.Si som una parella, a més, ho farem individualment.En cas que un membre de la parella es doni de baixa per escrit i l'altre no, se seguirà cobrant la quota d'aquest al mateix número de compte que ens heu donat, a no ser que es comuniqui per escrit."
                type="checkbox"
                disabled={isDisabled}
              />
              <FieldForm
                name="agreements.agreement3"
                labelName="Acepto 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Sed euismod, nisl nec ultricies lacinia, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Sed euismod, nisl nec ultricies lacinia, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae."
                type="checkbox"
                disabled={isDisabled}
              />
              {!isDisabled ? (
                <Button
                  name={isSubmitting ? "Carregant" : "Continuar"}
                  type="submit"
                />
              ) : (
                <>
                  <Button
                    className={userpanel ? "hidden" : "block"}
                    name="Editar"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDisabled(false);
                    }}
                  />
                  <Button
                    className={userpanel ? "hidden" : "block"}
                    color="success"
                    name="Guardar"
                    type="button"
                    onClick={() => {
                      if (adminpanel) {
                        fetchUpdateFamily(values);
                      }
                      fetchCreateFamily(values);
                    }}
                  />
                </>
              )}
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
