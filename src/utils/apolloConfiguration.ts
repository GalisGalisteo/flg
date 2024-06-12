import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from "@apollo/client";

const statusLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      const context = operation.getContext();
      const statusCode = context.response?.status;
  
      if (statusCode) {
        response.extensions = { ...response.extensions, statusCode };
        operation.setContext({ statusCode: statusCode });

      }
      return response;
    })
  })
  
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/",
    credentials: 'same-origin'
   
  });
  const link = from([statusLink, httpLink]);
  
  export const createApolloClient = () => {
    return new ApolloClient({
      link: link,
      cache: new InMemoryCache(),
    });
  };