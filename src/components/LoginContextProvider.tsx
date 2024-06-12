import React, { createContext, useState, useEffect } from "react";

interface LoginContext {
  isLoggedIn: boolean;
  updateLoggedIn: (newValue: boolean) => void;
}

export const LoginContext = createContext<LoginContext | undefined>(undefined);

export const LoginContextProvider = ({ children }: any) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const updateLoggedIn = (newValue: boolean) => {
    setLoggedIn(newValue);
  };

  return (
    <LoginContext.Provider
      value={{
        updateLoggedIn,
        isLoggedIn,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
