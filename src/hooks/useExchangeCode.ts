"use client";

import { useMutation } from "@apollo/client";
import { useLoginContext } from "../contexts/login/useLogingContext";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCognitoContext } from "@/contexts/cognito/useCognitoContext";
import { loginMutation } from "@/graphql/mutations";

export const useExchangeCode = () => {
  const { setUserEmail } = useCognitoContext();
  const { setIsLoggedIn } = useLoginContext();
  const [login] = useMutation(loginMutation);
  const router = useRouter();

  const exchangeCode = useCallback(async () => {
    try {
      const response = await login({ variables: { code: "user" } });
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
      console.log(error);
    }
  }, [login, setIsLoggedIn, setUserEmail, router]);

  return { exchangeCode };
};
