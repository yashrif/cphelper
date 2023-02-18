import React from "react";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import {
  IoGridOutline,
  IoCalendarClearOutline,
  IoPieChartOutline,
  IoPersonOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

export const SideBar = () => {
  const NavBar = [
    {
      icon: <IoGridOutline size={"2rem"} />,
      title: "Dashboard",
      link: "",
    },
    {
      icon: <IoCalendarClearOutline size={"2rem"} />,
      title: "Problem Set",
      link: "/problemset",
    },
    // {
    //   icon: <IoCalendarClearOutline size={"2rem"} />,
    //   title: "Calendar",
    //   link: `${category}/calendar`,
    // },
    // {
    //   icon: <IoPieChartOutline size={"2rem"} />,
    //   title: "Statistics",
    //   link: `${category}/statistics`,
    // },
    // {
    //   icon: <IoPersonOutline size={"2rem"} />,
    //   title: "Profile",
    //   link: `${category}/profile`,
    // },

    {
      icon: <IoLogOutOutline size={"2rem"} />,
      title: "Log out",
      //   link: "home",
      onClick: () => {
        localStorage.clear();
      },
    },
  ];

  const renderedNavList = NavBar.map((value, index) => {
    return (
      <Link key={index} to={`${value.link}`}>
        <Flex
          key={index}
          cursor="pointer"
          alignItems="center"
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
            backgroundColor: "bg2",
          }}
          onClick={value.onClick}
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
        className="dashboard-navbar"
        h="full"
        minW={"5rem"}
        maxW={"2xl"}
        alignItems="start"
        px={"16"}
        py={"36"}
      >
        <Flex
          h="full"
          direction="column"
          justifyContent="space-between"
          // pb="36"
        >
          <Box>{renderedNavList.slice(0, -1)}</Box>
          <Box>{renderedNavList.slice(-1)}</Box>
        </Flex>
      </Center>
    </>
  );
};
