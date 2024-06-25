"use client";

import { LoginContext } from "@/components/LogingContextProvider";
import { useContext } from "react";

export const useLoginContext = (): LoginContext => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error(
      "useLoginContext must be used within a LoginContextProvider"
    );
  }
  return context;
};
