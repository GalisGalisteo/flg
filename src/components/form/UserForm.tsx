"use client";

import { Ref, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik, FormikProps } from "formik";
import { date, object, string } from "yup";
import FieldForm from "./FieldForm";
import { Button } from "../Button";

const birthDate18 = new Date(
  new Date().getFullYear() - 18,
  new Date().getMonth(),
  new Date().getDate()
);

const formattedbirthDate18 = birthDate18.toISOString().split("T")[0];

export interface User {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  dni: string;
  phoneNumber: string;
  address: {
    street: string;
    streetNumber: string;
    postcode: string;
    city: string;
    flatNumber: string;
    county: string;
    country: string;
  };
}

const userSchema = object({
  firstName: string()
    .min(2, "Ha de tenir al menys dos lletres")
    .required("*Obligatori"),
  lastName: string()
    .min(2, "Ha de tenir al menys dos lletres")
    .required("*Obligatori"),
  birthDate: date()
    .max(birthDate18, "Has de ser major de 18 anys per ser soci")
    .required("*Obligatori"),
  dni: string().required("*Obligatori"),
  email: string()
    .email("Adreça de correu electrònic incorrecte")
    .required("*Obligatori"),
  phoneNumber: string().required("*Obligatori"),
});

interface UserFormProps {
  disabled?: boolean;
  userEmail?: string;
  formRef: Ref<FormikProps<User>>;
}

export default function UserForm({
  disabled = false,
  userEmail,
  formRef,
}: UserFormProps) {
  const [isDisabled, setIsDisabled] = useState(disabled);

  const initialValues: User = {
    firstName: "",
    lastName: "",
    birthDate: "",
    email: userEmail ? userEmail : "",
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
  };

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        validationSchema={userSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          console.log(values);
          setIsDisabled(true);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-3 w-full">
            <FieldForm
              name="firstName"
              labelName="Nom"
              type="text"
              placeholder="Nom"
              disabled={isDisabled}
              // value={data.firstName}
            />
            <FieldForm
              name="lastName"
              labelName="Cognoms"
              type="text"
              placeholder="Primer i Segon Cognom"
              disabled={isDisabled}
              // value={data.lastName}
            />
            <div className="sm:flex gap-3">
              <FieldForm
                name="birthDate"
                labelName="Data de naixement"
                type="date"
                disabled={isDisabled}
                // value={data.birthDate}
              />
              <FieldForm
                name="dni"
                labelName="DNI/NIE/Passaport"
                type="text"
                disabled={isDisabled}
                placeholder="12345678A"
                // value={data.dni}
              />
            </div>
            <FieldForm
              name="email"
              labelName="Correu electrònic"
              type="email"
              disabled={userEmail ? true : isDisabled}
              // value={data.email}
            />
            <FieldForm
              name="phoneNumber"
              labelName="Telèfon mòbil"
              type="tel"
              disabled={isDisabled}
              placeholder="+34612345678"
              // value={data.phoneNumber}
            />
            <FieldForm
              name="address.street"
              labelName="Adreça"
              type="text"
              disabled={isDisabled}
              placeholder="Carrer, avinguda, passeig..."
              // value={data.address.street}
            />
            <div className="sm:flex gap-3">
              <FieldForm
                name="address.streetNumber"
                labelName="Número"
                type="text"
                disabled={isDisabled}
                placeholder="123A"
                // value={data.address.streetNumber}
              />
              <FieldForm
                name="address.flatNumber"
                labelName="Pis i porta"
                type="text"
                disabled={isDisabled}
                placeholder="1-2"
                // value={data.address.flatNumber}
              />
              <FieldForm
                name="address.postcode"
                labelName="Codi postal"
                type="text"
                disabled={isDisabled}
                placeholder="08000"
                // value={data.address.postcode}
              />
            </div>
            <FieldForm
              name="address.city"
              labelName="Població"
              type="text"
              disabled={isDisabled}
              placeholder="Ciutat, poble..."
              // value={data.address.city}
            />
            <div className="sm:flex gap-3">
              <FieldForm
                name="address.county"
                labelName="Comunitat Autònoma"
                type="text"
                disabled={isDisabled}
                placeholder="Comunitat Autònoma"
                // value={data.address.city}
              />
              <FieldForm
                name="address.country"
                labelName="Païs"
                type="text"
                disabled={isDisabled}
                placeholder="Païs"
                // value={data.address.city}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
