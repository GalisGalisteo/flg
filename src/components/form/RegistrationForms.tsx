"use client";

import FamilyForm, { Family } from "@/components/form/FamilyForm";
import UserForm, { User } from "@/components/form/UserForm";
import { Button } from "../Button";
import { useRef } from "react";
import { FormikProps } from "formik";

export default function RegistrationForms() {
  const userFormRef = useRef<FormikProps<User>>(null);
  const familyFormRef = useRef<FormikProps<Family>>(null);

  const handleSubmit = async () => {
    if (userFormRef.current?.isValid && familyFormRef.current?.isValid) {
      await userFormRef?.current?.submitForm();
      await familyFormRef?.current?.submitForm();
    } else {
      userFormRef?.current?.setTouched({
        firstName: true,
        lastName: true,
        birthDate: true,
        email: true,
        dni: true,
        phoneNumber: true,
        address: {
          street: true,
          streetNumber: true,
          postcode: true,
          city: true,
          flatNumber: true,
          county: true,
          country: true,
        },
      });

      familyFormRef?.current?.setTouched({
        bankAccount: true,
        numberUsers: true,
        price: true,
        numberChildren: true,
        dateBirthChildren: true,
        heardFrom: true,
      });
    }
  };

  return (
    <>
      <div className="w-full max-w-[600px] flex flex-col gap-5">
        <h3 className="text-xl">Dades personals del primer familiar:</h3>
        <UserForm formRef={userFormRef} />
        <h3 className="text-xl">Dades de la familia:</h3>
        <FamilyForm formRef={familyFormRef} />
        {/* <h3 className="text-xl">Dades personals del segon familiar:</h3>
        <UserForm formRef={userFormRef} /> */}
      </div>
      <Button name={"Continuar"} type="submit" onClick={handleSubmit} />
    </>
  );
}
