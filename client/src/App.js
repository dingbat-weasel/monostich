import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import pages and components here
import Home from "./pages/Home";
// ...

// GraphQL API Endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// TO DO: JWT Token Middleware
// // Construct request middleware that will attach the JWT token to every request as an `authorization` header
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('id_token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

const client = new ApolloClient({
  // Client executes the 'authlink' middleware prior to making request to our graphql api
  link: authLink.concat(httpLink),
  // TO DO: Cache related things
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router></Router>
    </ApolloProvider>
  );
}

export default App;
