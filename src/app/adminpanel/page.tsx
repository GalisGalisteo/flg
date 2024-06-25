import ProtectedRoute from "@/components/ProtectedRoutes";
import React from "react";

export default function AdminPanel() {
  return (
    <ProtectedRoute>
      <div>AdminPanel</div>;
    </ProtectedRoute>
  );
}
