import { gql, useMutation } from "@apollo/client";
import { useContext } from "react";
import { LoginContext } from "./LoginContextProvider";
import { useNavigate } from "react-router-dom";
import { document } from "postcss";

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
  const loginContext = useContext(LoginContext);
  const [login] = useMutation(loginMutation);
  const navigation = useNavigate();

  const fetchLogin = async () => {
    try {
      const response = await login({ variables: { code: "user" } });
      const statusCode = response.extensions?.statusCode;
      if (statusCode === 200) {
        loginContext?.updateLoggedIn(true);
        console.log(response.data.login);
        const registrationResponse = response.data.login.registrationResponse;
        console.log('Cookies:', response.extensions); // Log the cookies

        if (registrationResponse === null) {
          navigation("/adminPanel");
        } else {
          registrationResponse.hasFamilyAccount
            ? navigation("/userPanel")
            : navigation("/registration");
        }
      }
    } catch (error) {
      loginContext?.updateLoggedIn(false);
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
