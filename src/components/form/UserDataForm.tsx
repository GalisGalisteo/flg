"use client";

import { Form, Formik } from "formik";
import { date, number, object, string } from "yup";
import FieldForm from "./FieldForm";
import { Button } from "../Button";
// import { useRouter } from "next/navigation";
import { useState } from "react";

const data: userData = {
  firstName: "Montse",
  lastName: "García López",
  birthDate: "1996-01-15",
  email: "montsegarcialopez@gmail.com",
  dni: "12345678N",
  phoneNumber: "+34666666666",
  bankAccount: "ES12 0000 0000 0000 0000 0000",
  address: {
    street: "Carrer de la Lluna",
    streetNumber: "1",
    postcode: "08001",
    city: "Barcelona",
    flatNumber: "1-3",
    country: "Espanya",
  },
};

const birthDate18 = new Date(
  new Date().getFullYear() - 18,
  new Date().getMonth(),
  new Date().getDate()
);

const formattedbirthDate18 = birthDate18.toISOString().split("T")[0];

export interface userData {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  dni: string;
  phoneNumber: string;
  bankAccount: string;
  address: {
    street: string;
    streetNumber: string;
    postcode: string;
    city: string;
    flatNumber: string;
    country: string;
  };
}

const initialValues: userData = {
  firstName: "",
  lastName: "",
  birthDate: "",
  email: "",
  dni: "",
  phoneNumber: "",
  bankAccount: "",
  address: {
    street: "",
    streetNumber: "",
    postcode: "",
    city: "",
    flatNumber: "",
    country: "",
  },
};

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
  phoneNumber: number().required("*Obligatori"),
});

interface UserDataFormProps {
  disabled?: boolean;
}

export default function UserDataForm({ disabled = false }: UserDataFormProps) {
  // const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(disabled);

  return (
    <>
      <Formik
        initialValues={data ? data : initialValues}
        validationSchema={userSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          // await router.push("/test");
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
              placeholder="El Teu Nom"
              disabled={isDisabled}
              // value={data.firstName}
            />
            <FieldForm
              name="lastName"
              labelName="Cognom"
              type="text"
              placeholder="El Teu Cognom"
              disabled={isDisabled}
              // value={data.lastName}
            />
            <FieldForm
              name="birthDate"
              labelName="Data de naixement"
              type="date"
              disabled={isDisabled}
              // value={data.birthDate}
            />
            {/* TODO change for a select for dni */}
            <FieldForm
              name="dni"
              labelName="DNI/NIE/passaport"
              type="text"
              disabled={isDisabled}
              // value={data.dni}
            />
            <FieldForm
              name="email"
              labelName="Correu electrònic"
              type="email"
              disabled={isDisabled}
              // value={data.email}
            />
            <FieldForm
              name="phoneNumber"
              labelName="Telèfon mòbil"
              type="tel"
              disabled={isDisabled}
              // value={data.phoneNumber}
            />
            <div>Adreça</div>
            <FieldForm
              name="address.street"
              labelName="Carrer"
              type="text"
              disabled={isDisabled}
              // value={data.address.street}
            />
            <div className="flex gap-3">
              <FieldForm
                name="address.streetNumber"
                labelName="Número"
                type="text"
                disabled={isDisabled}
                // value={data.address.streetNumber}
              />
              <FieldForm
                name="address.flatNumber"
                labelName="Pis"
                type="text"
                disabled={isDisabled}
                // value={data.address.flatNumber}
              />
              <FieldForm
                name="address.postcode"
                labelName="Codi postal"
                type="text"
                disabled={isDisabled}
                // value={data.address.postcode}
              />
            </div>
            <div className="flex gap-3">
              <FieldForm
                name="address.city"
                labelName="Ciutat"
                type="text"
                disabled={isDisabled}
                // value={data.address.city}
              />
              <FieldForm
                name="address.country"
                labelName="Païs"
                type="text"
                disabled={isDisabled}
                // value={data.address.city}
              />
            </div>

            <div className="flex gap-5 mx-5 mt-2">
              {!isDisabled ? (
                <Button
                  name={isSubmitting ? "Carregant" : "Guardar"}
                  type="submit"
                />
              ) : null}
              {/* <Button
              name="Cancelar"
              type="button"
              color="danger"
              onClick={() => router.push("https://www.google.com")}
            /> */}
            </div>
          </Form>
        )}
      </Formik>
      {isDisabled ? (
        <Button name="Editar" onClick={() => setIsDisabled(false)} />
      ) : null}
    </>
  );
}
