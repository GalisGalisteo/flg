"use client";

import { FieldArray, Form, Formik, FormikProps } from "formik";
import { array, date, number, object, string } from "yup";
import FieldForm from "./FieldForm";
import { Button } from "../Button";
import { Ref, useState } from "react";

const heardFrom = [
  "",
  "Facebook",
  "Instagram",
  "Buscador internet (Google...)",
  "Una amistat",
  "Un familiar",
  "Un altre",
] as const;

type HeardFrom = (typeof heardFrom)[number];

export interface Family {
  bankAccount: string;
  numberUsers: number;
  price: string;
  numberChildren: number;
  dateBirthChildren: string[];
  heardFrom: HeardFrom | null;
}

const familySchema = object({
  bankAccount: string().required("*Obligatori"),
  numberUsers: number().required("*Obligatori").oneOf([1, 2]),
  price: string().required("*Obligatori"),
  numberChildren: number().integer().min(0).max(14).required("*Obligatori"),
  dateBirthChildren: array()
    .of(date().required("Date is required").typeError("Invalid date"))
    .min(0)
    .max(14)
    .required("*Obligatori"),
  heardFrom: string().required("*Obligatori").oneOf(heardFrom),
});

interface FamilyFormProps {
  disabled?: boolean;
  userEmail?: string;
  formRef: Ref<FormikProps<Family>>;
}

export default function FamilyForm({
  disabled = false,
  formRef,
}: FamilyFormProps) {
  const [isDisabled, setIsDisabled] = useState(disabled);

  const initialValues: Family = {
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
        innerRef={formRef}
        initialValues={initialValues}
        validationSchema={familySchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          console.log(values);
          setIsDisabled(true);
          // Open modal to chek data is correct
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col gap-3 w-full">
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
            <div className="flex gap-5 mx-5 mt-2">
              {!isDisabled ? (
                <Button
                  name={isSubmitting ? "Carregant" : "Continuar"}
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
    </>
  );
}
