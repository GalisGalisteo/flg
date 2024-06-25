"use client";

import { gql, useMutation } from "@apollo/client";
import { useLoginContext } from "@/hooks/useLogingContext";
import { useRouter } from "next/navigation";

const loginMutation = gql`
  mutation ($code: String!) {
    login(code: $code) {
      loginResponse
      registrationResponse {
        hasFamilyAccount
        email
      }
    }
  }
`;

export const ExchangeCode = () => {
  const { isLoggedIn, setIsLoggedIn } = useLoginContext();
  const [login] = useMutation(loginMutation);
  const router = useRouter();

  const fetchLogin = async () => {
    try {
      const response = await login({ variables: { code: "user" } });
      const statusCode = response.extensions?.statusCode;
      if (statusCode === 200) {
        setIsLoggedIn(true);
        console.log(response.data.login);
        const registrationResponse = response.data.login.registrationResponse;
        if (registrationResponse === null) {
          router.push("/adminPanel");
        } else {
          registrationResponse.hasFamilyAccount
            ? router.push("/userPanel")
            : router.push("/registration");
        }
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.log(error);
    }
  };

  return (
    <>
      <button
        style={{ background: "blue" }}
        onClick={() => {
          fetchLogin();
        }}
      >
        <div style={{ color: "white" }}>Send code</div>
      </button>
    </>
  );
};
