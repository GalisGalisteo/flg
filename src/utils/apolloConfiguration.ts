import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const statusLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const statusCode = context.response?.status;
    console.log('aaaa',document.cookie);

    if (statusCode) {
      response.extensions = { ...response.extensions, statusCode };
      operation.setContext({
        statusCode: statusCode,
        
      });
    }
    return response;
  });
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/",
  //uri: "/api/:localhost:3001/",
  credentials: "include",
});



const link = from([statusLink, httpLink]);

export const createApolloClient = () => {
  return new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });
};
