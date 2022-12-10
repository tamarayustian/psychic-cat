import React from "react";
import {
  Box,
  Stack,
  Button,
  Container,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { genderList, animalList, conditionList } from "../helpers/constants";

export default function PetFilter({
  handleTagChange,
  filteredTags,
  clearFilter,
  onClose,
}) {
  return (
    <>
      <Container maxW="container.lg" p="0">
        <Box marginBottom={3}>
          <Text fontWeight="bold" as="i" fontSize="1.25rem">
            Select tags to filter:
          </Text>
        </Box>
        <Stack
          spacing={{ base: "6", md: "auto" }}
          alignItems="left"
          direction="column"
        >
          {animalList.map((tag) => (
            <Checkbox
              isChecked={filteredTags.includes(tag)}
              onChange={() => handleTagChange(tag)}
              size="lg"
              outline={1}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </Checkbox>
          ))}
          {genderList.map((tag) => (
            <Checkbox
              isChecked={filteredTags.includes(tag)}
              onChange={() => handleTagChange(tag)}
              size="lg"
              outline={1}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </Checkbox>
          ))}
          {conditionList.map((tag) => (
            <Checkbox
              isChecked={filteredTags.includes(tag)}
              onChange={() => handleTagChange(tag)}
              size="lg"
              outline={1}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </Checkbox>
          ))}
        </Stack>
        <Stack direction="row" spacing={3} marginTop="75px" display="flex">
          <Button
            onClick={clearFilter}
            width="100%"
            background="#A6A6A6"
            border="1px transparent #000000"
            boxSizing="border-box"
            backdropFilter="blur(6px)"
            borderRadius="10px"
            color="white"
          >
            Clear
          </Button>
          <Button
            onClick={onClose}
            width="100%"
            backgroundColor="blue.400"
            color="white"
            borderRadius="10px"
          >
            Filter
          </Button>
        </Stack>
      </Container>
    </>
  );
}
