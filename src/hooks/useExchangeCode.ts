"use client";

import { useCallback, useState } from "react";
import { useMutation } from "@apollo/client";
import { loginMutation } from "@/graphql/mutations";
import { useRouter } from "next/navigation";
import { useLoginContext } from "@/contexts/login/useLogingContext";
import { useCognitoContext } from "@/contexts/cognito/useCognitoContext";

export const useExchangeCode = () => {
  const { setUserEmail } = useCognitoContext();
  const { setIsLoggedIn } = useLoginContext();
  const [login] = useMutation(loginMutation);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const exchangeCode = useCallback(async () => {
    setError(null);
    try {
      const response = await login({
        variables: { code: "admin" },
      });
      const statusCode = response.extensions?.statusCode;
      if (statusCode === 200) {
        setIsLoggedIn(true);
        console.log(response.data.login);
        const registrationResponse = response.data.login.registrationResponse;
        if (registrationResponse === null) {
          router.push("/adminpanel");
        } else {
          setUserEmail(registrationResponse.email);
          registrationResponse.hasFamilyAccount
            ? router.push("/userpanel")
            : router.push("/registration");
        }
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.error(error);
      setError("An error ocurred. Please try again later.");
    }
  }, [login, setIsLoggedIn, setUserEmail, router]);

  return { exchangeCode, error };
};
