import {
  Flex,
  FormControl,
  FormLabel,
  useToast,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export default function GuestForm(props) {
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onCreate = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      fullName: fullName,
      phoneNumber: phoneNumber,
    };
    const res = await axios.post("/api/user/create", payload);
    if (res.status === 200) {
      toast({
        title: "Guest added.",
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
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="fullName">
            <FormLabel>Full Name</FormLabel>
            <Input onChange={(e) => setFullName(e.target.value)} />
          </FormControl>
          <FormControl id="phoneNumber">
            <FormLabel>Phone Number</FormLabel>
            <Input onChange={(e) => setPhoneNumber(e.target.value)} />
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
