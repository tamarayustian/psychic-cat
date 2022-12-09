import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid } from "@chakra-ui/react";
import PetCard from "./PetCard";

export default function PetContainer(props) {
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
    <Container maxW="90vw" padding={[0, 2]}>
      <Grid templateColumns={"repeat(2, 1fr)"} gap={[3, 6]}>
        {pets.length > 0 &&
          pets.map((pet, i) => <PetCard key={"pet" + i} petData={pet[i]} />)}
      </Grid>
    </Container>
  );
}
