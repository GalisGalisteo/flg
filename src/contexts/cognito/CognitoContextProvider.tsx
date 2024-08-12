"use client";

import { ReactNode, createContext, useState } from "react";

export interface ICognitoContext {
  userEmail: string | null;
  setUserEmail: (userEmail: ICognitoContext["userEmail"]) => void;
}

export const CognitoContext = createContext<ICognitoContext | undefined>(
  undefined
);

interface CognitoContextProviderProps {
  children: ReactNode;
}

export const CognitoContextProvider = ({
  children,
}: CognitoContextProviderProps) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  return (
    <CognitoContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </CognitoContext.Provider>
  );
};
