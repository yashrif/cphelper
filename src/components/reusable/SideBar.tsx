import React from "react";
import { Box, Center, Flex, Text, VStack } from "@chakra-ui/react";
import {
  IoSettingsOutline,
  IoPersonOutline,
  IoReaderOutline,
  IoBookmarkOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

export const SideBar = () => {
  interface NavBar {
    icon: JSX.Element;
    title: string;
    link: string;
  }

  const NavBar = [
    {
      icon: <IoPersonOutline size={"2rem"} color={"#666"} />,
      title: "Profile",
      link: "",
    },
    {
      icon: <IoReaderOutline size={"2rem"} color={"#666"} />,
      title: "Problems",
      link: "/problemset",
    },
    {
      icon: <IoBookmarkOutline size={"2rem"} color={"#666"} />,
      title: "Collection",
      link: "/collection",
    },

    {
      icon: <IoSettingsOutline size={"2rem"} color={"#666"} />,
      title: "Settings",
      link: "/settings",
    },
  ] as NavBar[];

  const renderedNavList = NavBar.map((value: NavBar, index) => {
    return (
      <Link key={index} to={`${value.link}`}>
        <Flex
          key={index}
          cursor="pointer"
          alignItems="center"
          justifyContent={"center"}
          columnGap="12"
          px="24"
          py="16"
          borderRadius="lg"
          fontSize="lg"
          fontWeight="medium"
          color="font.muted"
          transition="all 0.3s"
          _hover={{
            color: "font.focused",
            backgroundColor: "bg7",
          }}
        >
          {value.icon}
          <Text>{value.title}</Text>
        </Flex>
      </Link>
    );
  });

  return (
    <>
      <style>
        {`
          .dashboard-navbar *:focus{
            box-shadow: none;
          }
        `}
      </style>
      <Center
        boxShadow={"0.2rem 0 3.6rem rgba(28, 126, 214, .08)"}
        className="dashboard-navbar"
        h="full"
        minW={"5rem"}
        maxW={"2xl"}
        alignItems="start"
        px={"16"}
        py={"36"}
      >
        <VStack h="full" justifyContent="space-between" alignItems={"stretch"}>
          <VStack gap={"8"} alignItems={"stretch"}>
            {renderedNavList.slice(0, -1)}
          </VStack>
          <Box>{renderedNavList.slice(-1)}</Box>
        </VStack>
      </Center>
    </>
  );
};
