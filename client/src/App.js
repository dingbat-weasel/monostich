// TO DO:
// Connect to GraphQl
// with ApolloClient
// JWT Token setup
// with Context

import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
// Use with JWT Token
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./assets/theme.js";

// import pages and components here
import Home from "./pages/Home/Home.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Signin from "./pages/Signin/Signin.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import SinglePoem from "./pages/SinglePoem/SinglePoem.jsx";
// ...

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // TO DO: Attach this mode to global state and give toggle widget to user (light/dark)
  const mode = "light";
  const theme = React.useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ApolloProvider client={client}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/poem" element={<SinglePoem />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;

// Notes
// MUI can be customized with react-router in some fancy way: https://mui.com/material-ui/guides/routing/
