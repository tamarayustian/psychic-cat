import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import SignUpContainer from "./auth/SignUpContainer";
import LoginContainer from "./auth/LoginContainer";
import PetContainer from "./pet/PetContainer";
import PetForm from "./pet/PetForm";
import GuestForm from "./guest/GuestForm";

const MainContainer = () => {
  return (
    <chakra.main id="main-container">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PetContainer />} />
          <Route exact path="/signup" element={<SignUpContainer />} />
          <Route exact path="/login" element={<LoginContainer />} />
          <Route exact path="/pet/view" element={<PetContainer />} />
          <Route exact path="/pet/form" element={<PetForm />} />
          <Route exact path="/guest/form" element={<GuestForm />} />
        </Routes>
      </BrowserRouter>
    </chakra.main>
  );
};

export default MainContainer;
