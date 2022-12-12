import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { animalList, genderList, conditionList } from "../helpers/constants";

export default function PetForm(props) {
  const toast = useToast();

  const [name, setName] = useState("");
  const [animal, setAnimal] = useState("unidentified");
  const [gender, setGender] = useState("unidentified");
  const [birthday, setBirthday] = useState("");
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [colour, setColour] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("healthy");

  // handle pet submission form
  const onCreate = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      animal,
      gender,
      birthday,
      breed,
      weight,
      colour,
      description,
      condition,
    };
    const res = await axios.post("/api/pet/create", payload);
    if (res.status === 200) {
      toast({
        title: "Animal added.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Try again!",
        description: "Something went wrong.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={4} w="80vh">
        <form onSubmit={onCreate}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl id="animal" isRequired>
            <FormLabel>Animal</FormLabel>
            <Select
              placeholder="Please fill in this field"
              onChange={(e) => setAnimal(e.target.value)}
            >
              {animalList.map((item) => {
                return <option key={item}>{item}</option>;
              })}
            </Select>
          </FormControl>
          <FormControl id="gender">
            <FormLabel>Gender</FormLabel>
            <Select
              placeholder="Please fill in this field"
              onChange={(e) => setGender(e.target.value)}
            >
              {genderList.map((item) => {
                return <option key={item}>{item}</option>;
              })}
            </Select>
          </FormControl>
          <FormControl id="birthday">
            <FormLabel>Birthday</FormLabel>
            <Input type="date" onChange={(e) => setBirthday(e.target.value)} />
          </FormControl>
          <FormControl id="breed">
            <FormLabel>Breed</FormLabel>
            <Input onChange={(e) => setBreed(e.target.value)} />
          </FormControl>
          <FormControl id="weight">
            <FormLabel>Weight</FormLabel>
            <Input onChange={(e) => setWeight(e.target.value)} />
          </FormControl>
          <FormControl id="colour">
            <FormLabel>Colour</FormLabel>
            <Input onChange={(e) => setColour(e.target.value)} />
          </FormControl>
          <FormControl id="description">
            <FormLabel>description</FormLabel>
            <Input onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
          <FormControl id="condition">
            <FormLabel>Condition</FormLabel>
            <Select
              placeholder="Please fill in this field"
              onChange={(e) => setCondition(e.target.value)}
            >
              {conditionList.map((item) => {
                return <option key={item}>{item}</option>;
              })}
            </Select>
          </FormControl>
          <Stack spacing={10} pt={4}>
            <Button loadingText="Adding" size="lg" type="submit">
              Add
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
