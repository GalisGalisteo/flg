"use client";

import { useContext } from "react";
import { CognitoContext, ICognitoContext } from "./CognitoContextProvider";

export const useCognitoContext = (): ICognitoContext => {
  const context = useContext(CognitoContext);
  if (!context) {
    throw new Error(
      "useCognitoContext must be used within a CognitoContextProvider"
    );
  }
  return context;
};
