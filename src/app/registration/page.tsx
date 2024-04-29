"use client";

import React from "react";
import RegisterUserForm from "@/components/form/RegisterUserForm";

export default function RegistrationPage() {
  return (
    <main className="flex flex-col justify-center items-center pt-5 gap-3">
      <h1 className="text-xl">Dades personals del primer familiar</h1>
      <RegisterUserForm />
    </main>
  );
}
