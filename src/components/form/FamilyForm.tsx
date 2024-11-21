"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import { printFormat } from "iban";
import clsx from "clsx";

import FieldForm from "./FieldForm";
import { Button } from "../common/Button";
import ChildrenFieldArray from "./ChildrenFieldArray";

import { initializeFormValues } from "@/forms/family/useInitializeValues";
import { familySchema } from "@/forms/family/FamilySchema";

import { useCreateFamily } from "@/hooks/useCreateFamily";
import { useUpdateFamily } from "@/hooks/useUpdateFamily";

import { updateMembers, calculatePrice } from "@/utils/utils";
import { Family, howCognized } from "@/types/family";

interface FamilyFormProps {
  userEmail?: string | null;
  data?: Family;
  disabled?: boolean;
  userpanel?: boolean;
  adminpanel?: boolean;
  prices?: {
    cataloniaBased: string;
    outsideCatalonia: string;
  };
  isMember?: boolean | null;
}

export default function FamilyForm({
  userEmail,
  data,
  disabled = false,
  userpanel = false,
  adminpanel = false,
  prices,
  isMember,
}: FamilyFormProps) {
  console.log("🚀 ~ data:", data);
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(disabled);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = useMemo(
    () => initializeFormValues(data, userEmail),
    [data, userEmail]
  );

  const { fetchCreateFamily } = useCreateFamily();
  const { fetchUpdateFamily } = useUpdateFamily(data?.id);

  const handleSubmit = async (
    values: Family,
    isMember: boolean | null | undefined
  ) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    setIsLoading(true);
    setError(null);
    const updatedMember = {
      ...values.members[0],
      id: data?.members[0].id, // Add or overwrite the `id` with the `userId` from `data`
    };
    const updatedValues = {
      ...values,
      members: updatedMember,
    };
    const result = adminpanel
      ? await fetchUpdateFamily(updatedValues, isMember)
      : await fetchCreateFamily(values);

    if (!result.success) {
      setError(result.message);
    } else {
      router.push(adminpanel ? "/adminpanel" : "/userpanel");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={familySchema}
        validateOnChange
        onSubmit={() => setIsDisabled(true)}
      >
        {({ values, setFieldValue }) => {
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
            setFieldValue(
              "members",
              values.members.slice(0, values.numberUsers)
            );
          }

          // calculating membership price
          const calculatedPrice = calculatePrice(
            values.catResident,
            values.numberUsers,
            prices
          );

          if (values.price !== calculatedPrice) {
            setFieldValue("price", calculatedPrice);
          }
          return (
            <Form
              className={clsx(
                "flex flex-col gap-3 p-5 rounded-xl",
                isDisabled && !adminpanel
                  ? "sm:bg-white sm:bg-opacity-50"
                  : null
              )}
            >
              {((isMember && adminpanel) || !adminpanel) &&
                values.members.map((_, index) => (
                  <div key={index}>
                    <h3 className="text-center text-xl">
                      Dades personals
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
              {((!isMember && adminpanel) || !adminpanel) && (
                <>
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
                      formatValue={(value) => printFormat(value, " ")}
                    />
                    <FieldForm
                      name="numberChildren"
                      labelName="Nombre de criatures"
                      type="number"
                      disabled={isDisabled}
                    />
                  </div>
                  <ChildrenFieldArray isDisabled={isDisabled} />
                  {adminpanel && <Button name="▽" className="bg-transparent" />}
                  {!adminpanel && (
                    <>
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
                    </>
                  )}
                </>
              )}
              {!isDisabled ? (
                <Button name="Continuar" type="submit" />
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
                    isLoading={isLoading}
                    onClick={() => {
                      console.log("🚀 ~ values:", values);
                      return handleSubmit(values, isMember);
                    }}
                  />
                </>
              )}
            </Form>
          );
        }}
      </Formik>
      {error ? (
        <p className="text-red-600">Ups! An error ocurred: {error}</p>
      ) : null}
    </>
  );
}
