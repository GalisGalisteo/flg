import ProtectedRoute from "@/components/ProtectedRoutes";
import React from "react";

export default function UserPanel() {
  return (
    <ProtectedRoute>
      <div>UserPanel</div>;
    </ProtectedRoute>
  );
}
