"use client";

import { Form, Formik } from "formik";
import { date, number, object, string } from "yup";
import FieldForm from "./FieldForm";
import { Button } from "../Button";
import { useRouter } from "next/navigation";

const initialValues = {
  firstName: "",
  lastName: "",
  birthDate: "",
  email: "",
  dni: "",
  phoneNumber: "",
};

const userSchema = object({
  firstName: string()
    .min(2, "Ha de tenir al menys dos lletres")
    .required("*Obligatori"),
  lastName: string()
    .min(2, "Ha de tenir al menys dos lletres")
    .required("*Obligatori"),
  birthDate: date()
    .max(
      new Date(
        new Date().getFullYear() - 18,
        new Date().getMonth(),
        new Date().getDate()
      ),
      "Has de ser major de 18 anys per ser soci"
    )
    .required("*Obligatori"),
  dni: string().required("*Obligatori"),
  email: string()
    .email("Adreça de correu electrònic incorrecte")
    .required("*Obligatori"),
  phoneNumber: number().required("*Obligatori"),
});

export default function RegisterUserForm() {
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
        await router.push("/test");
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-3">
          <FieldForm
            name="firstName"
            labelName="Nom"
            type="text"
            placeholder="El Teu Nom"
          />
          <FieldForm
            name="lastName"
            labelName="Cognom"
            type="text"
            placeholder="El Teu Cognom"
          />
          <FieldForm
            name="birthDate"
            labelName="Data de naixement"
            type="date"
          />
          {/* TODO change for a select for dni */}
          <FieldForm name="dni" labelName="DNI/NIE/passaport" type="text" />
          <FieldForm name="email" labelName="Correu electrònic" type="email" />
          <FieldForm name="phoneNumber" labelName="Telèfon mòbil" type="tel" />

          <div className="flex gap-5 mx-5 mt-2">
            <Button
              name={isSubmitting ? "Carregant" : "Guardar"}
              type="submit"
            />
            <Button
              name="Cancelar"
              type="button"
              color="danger"
              onClick={() => console.log("Go Back To Web")}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
