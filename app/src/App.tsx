import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar } from "./components/AppBar";
import { Welcome } from "./components/Welcome";
import ImageGalleryContainer from "./containers/ImageGalleryContainer";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";
import { ImageGalleryProvider } from "./contexts/ImageGalleryContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fa5a28",
    },
    secondary: {
      main: "#00ccb0",
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <ImageGalleryProvider>
          <CssBaseline />
          <Box sx={{ flexGrow: 1 }}>
            <AppBar />
            <ImageGalleryContainer />
          </Box>
        </ImageGalleryProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};
