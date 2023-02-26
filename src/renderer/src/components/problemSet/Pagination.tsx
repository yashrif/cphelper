import { useEffect, useState } from "react";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setSelectedProblemPage } from "../../store/slices/utilsSlice";

export const Pagination = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const dispatch = useAppDispatch();

  const problemsPerPage = useAppSelector((state) => state.utils.problemsPerPage);
  const totalProblems = useAppSelector((state) => state.utils.totalFilteredProblems);

  useEffect(() => {
    setTotalPage(Math.ceil(totalProblems / problemsPerPage));
  }, [problemsPerPage, totalProblems]);

  useEffect(() => {
    dispatch(setSelectedProblemPage(selectedPage));
  }, [selectedPage]);

  const renderIcons = (icon: JSX.Element, value: number) => (
    <Flex
      key={value}
      cursor={"pointer"}
      boxSize={"3.2rem"}
      color={value === selectedPage ? "font.light" : "font.general"}
      bg={value === selectedPage ? "primary.400" : "transparent"}
      borderRadius={"full"}
      justifyContent={"center"}
      alignItems={"center"}
      transition={"all .3s"}
      _hover={{
        color: "font.light",
        bg: "primary.400"
      }}
      onClick={() => {
        setSelectedPage(value > totalPage ? totalPage : value < 1 ? 1 : value);
      }}
    >
      {icon}
    </Flex>
  );

  const renderPageNumber = (value: number) => {
    const max = value > 3 ? (selectedPage + 2 > value ? value : selectedPage + 2) : value;
    const renders: JSX.Element[] = [];

    for (
      let i =
        selectedPage - 1 < 1
          ? 1
          : selectedPage === totalPage
          ? selectedPage - 3
          : selectedPage === totalPage - 1
          ? selectedPage - 2
          : selectedPage - 1;
      i <=
      (selectedPage + 1 > totalPage
        ? selectedPage
        : selectedPage === totalPage - 2 || selectedPage === 1
        ? selectedPage + 2
        : selectedPage + 1);
      i++
    ) {
      renders.push(
        renderIcons(
          <Text fontSize={"lg"} fontWeight={"medium"}>
            {i}
          </Text>,
          i
        )
      );
    }

    if (value > 3 && max < value) {
      renders.push(
        <Box mt={"4"} key={totalPage + 1}>
          <HiOutlineEllipsisHorizontal size={"2rem"} />
        </Box>
      );

      renders.push(
        renderIcons(
          <Text fontSize={"lg"} fontWeight={"medium"}>
            {value}
          </Text>,
          value
        )
      );
    }

    return renders;
  };

  return (
    <Center gap={"12"}>
      {renderIcons(<IoChevronBackOutline size={"1.8rem"} />, selectedPage - 3)}

      {renderPageNumber(totalPage)}

      {renderIcons(<IoChevronForwardOutline size={"1.8rem"} />, selectedPage + 3)}
    </Center>
  );
};
