import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import SignUpContainer from "./auth/SignUpContainer";
import LoginContainer from "./auth/LoginContainer";

const MainContainer = () => {
  return (
    <chakra.main id="main-container">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" />
          <Route exact path="/signup" element={<SignUpContainer />} />
          <Route exact path="/login" element={<LoginContainer />} />
          <Route exact path="/profile" element={<LoginContainer />} />
        </Routes>
      </BrowserRouter>
    </chakra.main>
  );
};

export default MainContainer;
