"use client";

import { Family, howCognized } from "@/types/family";
import { ErrorMessage, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import FieldForm from "./FieldForm";
import { Button } from "../Button";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const createFamilyAccountMutation = gql`
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

interface RegistrationFormProps {
  userEmail?: string | null;
  disabled?: boolean;
  userpanel?: boolean;
  data?: Family;
}

export default function RegistrationForm({
  userEmail,
  data,
  disabled = false,
  userpanel = false,
}: RegistrationFormProps) {
  const [isDisabled, setIsDisabled] = useState(disabled);
  const [createFamily] = useMutation(createFamilyAccountMutation);

  const router = useRouter();

  const initialValues: Family = {
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
    bankAccount: data?.bankAccount || "",
    numberUsers: data?.numberUsers || 1,
    price: data?.price || "0.00 €",
    numberChildren: data?.children.length || 0,
    children: data?.children || [],
    howCognized: data?.howCognized || "",
    agreements: {
      agreement1: data?.agreements.agreement1 || false,
      agreement2: data?.agreements.agreement2 || false,
      agreement3: data?.agreements.agreement3 || false,
    },
  };

  const fetchCreateFamily = async (values: Family) => {
    try {
      console.log("fetchCreateFamily: ", values);

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
      };

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
        //  validationSchema={registrationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);

          console.log("values", values);
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

          return (
            <Form
              className={clsx(
                "flex flex-col gap-3 p-5 rounded-xl",
                isDisabled ? "sm:bg-white sm:bg-opacity-50" : null
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
                  <FieldForm
                    name={`members[${index}].address.city`}
                    labelName="Població"
                    type="text"
                    disabled={isDisabled}
                    placeholder="Ciutat, poble..."
                  />
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
              <FieldForm
                name="numberUsers"
                labelName="Nombre de persones socies"
                type="select"
                placeholder="Primer i Segon Cognom"
                disabled={isDisabled}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
              </FieldForm>

              <div className="sm:flex gap-3">
                <FieldForm
                  name="price"
                  labelName="Preu quota anual"
                  type="text"
                  disabled
                  // needs to calculate price
                />
                <FieldForm
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
              <FieldArray
                name="children"
                render={(arrayHelpers) => {
                  if (values.numberChildren < values.children.length) {
                    // Remove extra children
                    arrayHelpers.form.setFieldValue(
                      "children",
                      values.children.slice(0, values.numberChildren)
                    );
                  } else if (values.numberChildren > values.children.length) {
                    // Add empty children
                    for (
                      let i = values.children.length;
                      i < values.numberChildren;
                      i++
                    ) {
                      arrayHelpers.push("");
                    }
                  }

                  return (
                    <div className="grid grid-cols-2 gap-3">
                      {Array.from({ length: values.numberChildren }, (_, i) => (
                        <div key={i}>
                          <p>Criatura {i + 1}</p>
                          <FieldForm
                            key={i}
                            name={`children[${i}]`}
                            labelName="Data de naixement"
                            type="date"
                            disabled={isDisabled}
                          />
                        </div>
                      ))}
                    </div>
                  );
                }}
              />
              <ErrorMessage name="dateBirthChildren">
                {(msg) => <p className="text-red-600">{msg}</p>}
              </ErrorMessage>
              <FieldForm
                name="howCognized"
                labelName="Com has arribat a nosaltres?"
                type="select"
                disabled={isDisabled}
              >
                {howCognized.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </FieldForm>
              <FieldForm
                name="agreements.agreement1"
                labelName="Accepto 1"
                type="checkbox"
                disabled={isDisabled}
              />
              <FieldForm
                name="agreements.agreement2"
                labelName="Accepto 2"
                type="checkbox"
                disabled={isDisabled}
              />
              <FieldForm
                name="agreements.agreement3"
                labelName="Accepto 3"
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
                    name="Send"
                    type="button"
                    onClick={() => {
                      fetchCreateFamily(values);
                      console.log("values send", values);
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
