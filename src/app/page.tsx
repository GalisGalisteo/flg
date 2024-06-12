"use client"; // This ensures the component is treated as a client-side component

import {
  LoginContext,
  LoginContextProvider,
} from "@/components/LoginContextProvider";
import { ExchangeCode } from "@/components/ExchangeCode";
import RegistrationForm from "@/components/form/RegistrationForm";
import { ProtectedRoute } from "@/components/ProtectedRoutes";
import { createApolloClient } from "@/utils/apolloConfiguration";
import { ApolloProvider } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// comes from Cognito, I think the best is save it in useContext
const data = {
  email: "montsegarcialopez@gmail.com",
};

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ExchangeCode />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/registration" element={<RegistrationForm />} />
      <Route path="/userPanel" element={<>userPanel</>} />
      <Route path="/adminPanel" element={<>adminPanel</>} />
    </Route>
  </Routes>
);

const apolloClient = createApolloClient();

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center pt-5 gap-10 mx-5">
      <h1 className="text-2xl">Et donem la benvinguda a l'app de FLG!</h1>
      <h2 className="text-lg">
        Si us plau, acabeu ompliu les vostres dades personals i les de la
        familia.
      </h2>
      <div className="w-full max-w-[600px] flex flex-col gap-5">
        {/*<RegistrationForm/>*/}
        <Router>
          <ApolloProvider client={apolloClient}>
            <LoginContextProvider>
              <AppRoutes></AppRoutes>
            </LoginContextProvider>
          </ApolloProvider>
        </Router>
      </div>
    </main>
  );
}
