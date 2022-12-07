import React from "react";
import {
  Box,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box {...props}>
      <Text
        fontSize="lg"
        fontWeight="bold"
        textAlign={useBreakpointValue({ base: "center", md: "left" })}
        fontFamily={"heading"}
        color={useColorModeValue("gray.800", "white")}
      >
        KIN Pets
      </Text>
    </Box>
  );
}
