"use client";

import { useContext } from "react";
import { ILoginContext, LoginContext } from "./LogingContextProvider";

export const useLoginContext = (): ILoginContext => {
  const context = useContext(LoginContext);
  if (!context) {
    console.error("useLoginContext must be used within a LoginContextProvider");
    throw new Error(
      "useLoginContext must be used within a LoginContextProvider"
    );
  }
  return context;
};
