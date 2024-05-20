"use client";

import React from "react";
import UserDataForm from "@/components/form/UserDataForm";

export default function RegistrationPage() {
  return (
    <main className="flex flex-col justify-center items-center pt-5 gap-3 max-w-96 mx-auto">
      <h1 className="text-xl">Dades personals del primer familiar</h1>
      <UserDataForm />
    </main>
  );
}
