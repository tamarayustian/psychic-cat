import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import SignUpContainer from "./auth/SignUpContainer";
import LoginContainer from "./auth/LoginContainer";
import PetContainer from "./pet/PetContainer";
import PetForm from "./pet/PetForm";

const MainContainer = () => {
  return (
    <chakra.main id="main-container">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PetContainer />} />
          <Route exact path="/view" element={<PetContainer />} />
          <Route exact path="/signup" element={<SignUpContainer />} />
          <Route exact path="/login" element={<LoginContainer />} />
          <Route exact path="/profile" element={<LoginContainer />} />
          <Route exact path="/form" element={<PetForm />} />
        </Routes>
      </BrowserRouter>
    </chakra.main>
  );
};

export default MainContainer;
