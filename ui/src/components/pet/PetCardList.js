import { useState, useRef } from "react";
import {
  Grid,
  Text,
  Button,
  HStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import PetCard from "./PetCard";
import Pagination from "../helpers/Pagination";
import FilterTexts from "./PetFilter";
import { BiFilterAlt } from "react-icons/bi";

const PetCardList = ({ allPet }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 10;
  const [filteredTags, setFilteredTags] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  // filter section
  const pets = allPet.filter((pet) => {
    if (filteredTags.length === 0) {
      return true;
    } else {
      let foundMatchingTag = false;
      pet.tags.forEach((tag) => {
        if (filteredTags.includes(tag)) foundMatchingTag = true;
      });
      return foundMatchingTag;
    }
  });

  const handleTagChange = (tag) => {
    const newTags = [...filteredTags];
    if (newTags.includes(tag)) {
      var index = newTags.indexOf(tag);
      if (index > -1) {
        newTags.splice(index, 1);
      }
      setFilteredTags(newTags);
    } else {
      setFilteredTags([...newTags, tag]);
    }
  };

  const clearFilter = () => {
    setFilteredTags([]);
  };

  const handleClose = () => {
    setCurrentPage(1);
    onClose();
  };

  // pagination section
  const indexOfLastText = currentPage * petsPerPage;
  const indexOFFirstText = indexOfLastText - petsPerPage;
  const currentPets = pets.slice(indexOFFirstText, indexOfLastText);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <HStack marginTop={[4, 8]} spacing="auto">
        <Text
          textStyle="dm_sans"
          size="md"
          fontSize={["1.25rem", "2rem"]}
          fontWeight={500}
          minWidth="50vw"
        >
          PETS
        </Text>
        <Button
          width={["50%", "20%"]}
          display="flex"
          backdropFilter="blur(6px)"
          borderRadius={20}
          color="white"
          leftIcon={<BiFilterAlt />}
          ref={btnRef}
          onClick={onOpen}
        >
          FILTER
        </Button>
      </HStack>
      {/* box filter */}
      <Grid
        marginTop={[4, 8]}
        templateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)"]}
        gap={[3, 6]}
      >
        {currentPets.length > 0 &&
          currentPets.map((pet, i) => (
            <PetCard allPet={allPet} petData={pet} />
          ))}
      </Grid>
      <Pagination
        itemsPerPage={petsPerPage}
        totalItems={pets.length}
        paginate={paginate}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent paddingTop="10">
          <DrawerCloseButton margin="5" />
          <DrawerHeader />
          <DrawerBody>
            <FilterTexts
              allPets={allPet}
              handleTagChange={handleTagChange}
              filteredTags={filteredTags}
              clearFilter={clearFilter}
              onClose={handleClose}
            />
          </DrawerBody>
          <DrawerFooter fontSize="sm" color="black" justifyContent="center">
            KIN Pet {new Date().getFullYear()}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PetCardList;
