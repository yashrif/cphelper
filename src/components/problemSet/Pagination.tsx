import React from "react";
import { Box, Center, Flex } from "@chakra-ui/react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

import { useAppSelector } from "../../hooks/hooks";
import { numbers } from "kute.js";

export const Pagination = () => {
  const problemsPerPage = useAppSelector(
    (state) => state.utils.problemsPerPage
  );
  const totalProblems = useAppSelector(
    (state) => state.utils.totalFilteredProblems
  );

  const renderIcons = (...icons: JSX.Element[]) =>
    icons.map((icon, index) => {
      return (
        <Flex
          key={index}
          p={"8"}
          color={"#fff"}
          bg={"primary.400"}
          borderRadius={"full"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {icon}
        </Flex>
      );
    });

  return (
    <Center gap={"12"}>
      {renderIcons(<IoChevronBackOutline size={"2rem"} />)}

      {renderIcons(<IoChevronForwardOutline size={"2rem"} />)}
    </Center>
  );
};
