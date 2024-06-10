"use client";

import { Family, heardFrom } from "@/models/family";
import { User } from "@/models/user";
import { ErrorMessage, FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";
import FieldForm from "./FieldForm";
import { Button } from "../Button";
import { registrationSchema } from "./RegistrationSchema";

interface RegistrationFormProps {
  disabled?: boolean;
}

export default function RegistrationForm({
  disabled = false,
}: RegistrationFormProps) {
  const [isDisabled, setIsDisabled] = useState(disabled);

  const initialValues: User & Family = {
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    dni: "",
    phoneNumber: "",
    address: {
      street: "",
      streetNumber: "",
      postcode: "",
      city: "",
      flatNumber: "",
      county: "",
      country: "",
    },
    bankAccount: "",
    numberUsers: 2,
    price: "0.00 €",
    numberChildren: 0,
    dateBirthChildren: [],
    heardFrom: "",
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        //  validationSchema={registrationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          console.log(values);
          setIsDisabled(true);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col gap-3 w-full">
            <FieldForm
              name="firstName"
              labelName="Nom"
              type="text"
              placeholder="Nom"
              disabled={isDisabled}
            />
            <FieldForm
              name="lastName"
              labelName="Cognoms"
              type="text"
              placeholder="Primer i Segon Cognom"
              disabled={isDisabled}
            />
            <div className="sm:flex gap-3">
              <FieldForm
                name="birthDate"
                labelName="Data de naixement"
                type="date"
                disabled={isDisabled}
              />
              <FieldForm
                name="dni"
                labelName="DNI/NIE/Passaport"
                type="text"
                disabled={isDisabled}
                placeholder="12345678A"
              />
            </div>
            <FieldForm
              name="email"
              labelName="Correu electrònic"
              type="email"
              disabled={isDisabled}
            />
            <FieldForm
              name="phoneNumber"
              labelName="Telèfon mòbil"
              type="tel"
              disabled={isDisabled}
              placeholder="+34612345678"
            />
            <FieldForm
              name="address.street"
              labelName="Adreça"
              type="text"
              disabled={isDisabled}
              placeholder="Carrer, avinguda, passeig..."
            />
            <div className="sm:flex gap-3">
              <FieldForm
                name="address.streetNumber"
                labelName="Número"
                type="text"
                disabled={isDisabled}
                placeholder="123A"
              />
              <FieldForm
                name="address.flatNumber"
                labelName="Pis i porta"
                type="text"
                disabled={isDisabled}
                placeholder="1-2"
              />
              <FieldForm
                name="address.postcode"
                labelName="Codi postal"
                type="text"
                disabled={isDisabled}
                placeholder="08000"
              />
            </div>
            <FieldForm
              name="address.city"
              labelName="Població"
              type="text"
              disabled={isDisabled}
              placeholder="Ciutat, poble..."
            />
            <div className="sm:flex gap-3">
              <FieldForm
                name="address.county"
                labelName="Comunitat Autònoma"
                type="text"
                disabled={isDisabled}
                placeholder="Comunitat Autònoma"
              />
              <FieldForm
                name="address.country"
                labelName="Païs"
                type="text"
                disabled={isDisabled}
                placeholder="Païs"
              />
            </div>
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
              name="dateBirthChildren"
              render={(arrayHelpers) => (
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: values.numberChildren }, (_, i) => (
                    <div key={i}>
                      <p>Criatura {i + 1}</p>
                      <FieldForm
                        key={i}
                        name={`dateBirthChildren[${i}]`}
                        labelName="Data de naixement"
                        type="date"
                        disabled={isDisabled}
                      />
                    </div>
                  ))}
                </div>
              )}
            />
            <ErrorMessage name="dateBirthChildren">
              {(msg) => <p className="text-red-600">{msg}</p>}
            </ErrorMessage>
            <FieldForm
              name="heardFrom"
              labelName="Com has arribat a nosaltres?"
              type="select"
              disabled={isDisabled}
            >
              {heardFrom.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </FieldForm>
            {!isDisabled ? (
              <Button
                name={isSubmitting ? "Carregant" : "Continuar"}
                type="submit"
              />
            ) : (
              <Button
                name="Editar"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDisabled(false);
                }}
              />
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}