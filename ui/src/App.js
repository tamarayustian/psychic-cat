import React from "react";
import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import MainContainer from "./components/MainContainer";
import NavBar from "./components/navigation/NavBar";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH={"100vh"}>
          <NavBar />
          <MainContainer />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
