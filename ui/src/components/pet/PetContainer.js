import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@chakra-ui/react";
import PetCardList from "./PetCardList";

const PetContainer = (props) => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    getPets();
  }, []);

  const getPets = async () => {
    try {
      const { data, status } = await axios.get("/api/pet/get");
      if (status === 200) {
        setPets([data]);
      } else {
        throw Error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxW="100%" padding={[0, 2]}>
      <PetCardList allPet={pets} />
    </Container>
  );
};

export default PetContainer;
