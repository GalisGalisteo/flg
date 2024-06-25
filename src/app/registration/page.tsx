import ProtectedRoute from "@/components/ProtectedRoutes";
import RegistrationForm from "@/components/form/RegistrationForm";
import React from "react";

export default function page() {
  return (
    <ProtectedRoute>
      <RegistrationForm />
    </ProtectedRoute>
  );
}
