"use client";

import ProtectedRoute from "@/components/ProtectedRoutes";
import RegistrationForm from "@/components/form/RegistrationForm";
import { useCognitoContext } from "@/contexts/cognito/useCognitoContext";
import React from "react";

export default function RegistrationPage() {
  const { userEmail } = useCognitoContext();
  return (
    <ProtectedRoute>
      <div className="max-w-screen-sm space-y-5 m-5">
        <h1 className="text-2xl text-center">
          Et donem la benvinguda a l'app de FLG!
        </h1>
        <h2 className="text-lg">
          Si us plau, acabeu ompliu les vostres dades personals i les de la
          familia.
        </h2>
        <div className="p-5">
          <RegistrationForm userEmail={userEmail} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
