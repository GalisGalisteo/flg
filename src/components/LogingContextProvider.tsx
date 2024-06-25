"use client";

import { ReactNode, createContext, useState } from "react";

export interface LoginContext {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const LoginContext = createContext<LoginContext | undefined>(undefined);

interface LoginContextProviderProps {
  children: ReactNode;
}

export const LoginContextProvider = ({
  children,
}: LoginContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
