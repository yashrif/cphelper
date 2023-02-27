import { useEffect, useState } from "react";
import { Box, Center, Flex, Text, VStack, Grid, GridItem } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import {
  IoSettingsOutline,
  IoPersonOutline,
  IoReaderOutline,
  IoBookmarkOutline,
  IoCloseOutline
} from "react-icons/io5";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { loadProblems, updateAddedProblemsAndDelete } from "../../store/actions/cf/cfActions";

export const SideBar = () => {
  // const NUMBER_OF_PROBLEMS = 5;

  const location = useLocation();

  const [isCollectionExpanded, setIsCollectionExpanded] = useState(false);

  const dispatch: any = useAppDispatch();

  const addedProblems = useAppSelector((state) => state.cf.addedProblems);

  useEffect(() => {
    dispatch(loadProblems());
  }, []);

  interface NavBar {
    icon: JSX.Element;
    title: string;
    link: string | null;
  }

  const NavBar = [
    {
      icon: <IoPersonOutline size={"2rem"} color={"#666"} />,
      title: "Profile",
      link: ""
    },
    {
      icon: <IoReaderOutline size={"2rem"} color={"#666"} />,
      title: "Problems",
      link: "/problemset"
    },

    {
      icon: <IoSettingsOutline size={"2rem"} color={"#666"} />,
      title: "Settings",
      link: "/settings"
    }
  ] as NavBar[];

  const renderNav = (nav: NavBar) => (
    <Flex
      alignSelf={"stretch"}
      cursor="pointer"
      alignItems={"center"}
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
        backgroundColor: "bg7"
      }}
    >
      {nav.icon}
      <Text>{nav.title}</Text>
    </Flex>
  );

  const renderedNavList = NavBar.map((nav: NavBar, index) => {
    return (
      <Link key={index} to={`${nav.link}`}>
        {renderNav(nav)}
      </Link>
    );
  });

  const collectionNav = (
    <VStack key={"collection"} gap={"4"}>
      <Box
        onClick={() => {
          setIsCollectionExpanded((prevState) => !prevState);
        }}
      >
        {renderNav({
          icon: <IoBookmarkOutline size={"2rem"} color={"#666"} />,
          title: "Collection"
        } as NavBar)}
      </Box>
    </VStack>
  );

  renderedNavList.splice(-1, 0, collectionNav);

  /* -------------------------------------------------------------------------- */
  /*     Import sidebar in every needed components instead of App component     */
  /* -------------------------------------------------------------------------- */

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
        display={
          location.pathname === "/gettingstarted" || location.pathname === "/welcome" ? "none" : "block"
        }
        boxShadow={"0.2rem 0 3.6rem rgba(28, 126, 214, .08)"}
        className="dashboard-navbar"
        h={"full"}
        minW={"5rem"}
        maxW={"2xl"}
        alignItems={"start"}
        px={"16"}
        py={"36"}
        overflow={"hidden"}
      >
        <VStack h={"full"} gap={"16"} justifyContent={"space-between"} alignItems={"stretch"}>
          <Grid alignItems={"stretch"} gap={"4"} gridTemplateRows={"auto 1fr"} overflow={"hidden"}>
            {renderedNavList.slice(0, -1)}
            <style>
              {`
                ::-webkit-scrollbar {
                  width: .4rem;
                }
              `}
            </style>
            <Grid
              gridTemplateColumns={"auto 1fr"}
              pl={"36"}
              pr={"24"}
              columnGap={"16"}
              rowGap={"4"}
              // opacity={isCollectionExpanded ? 1 : 0}
              display={isCollectionExpanded ? "grid" : "none"}
              transition={"all .3s"}
              overflowX={"hidden"}
              overflowY={"scroll"}
            >
              <GridItem rowSpan={addedProblems?.length} borderLeft={"1px solid #ddd"}></GridItem>

              {addedProblems?.map((problem, index) => (
                <Flex
                  role={"group"}
                  key={index}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  gap={"4"}
                >
                  <Link to={`/problemset/problem/${problem.contestId}/${problem.index}`}>
                    <Text
                      fontSize={"md"}
                      color={"font.muted2"}
                      fontWeight={"medium"}
                      lineHeight={"tall"}
                      _hover={{
                        color: "primary.500"
                      }}
                    >
                      {problem.contestId + problem.index}
                    </Text>
                  </Link>

                  <Box
                    transition={"all .3s"}
                    display={"none"}
                    cursor={"pointer"}
                    _hover={{
                      transform: "scale(1.2)"
                    }}
                    onClick={() => {
                      dispatch(updateAddedProblemsAndDelete(problem));
                    }}
                    _groupHover={{ display: "block" }}
                  >
                    <IoCloseOutline size={"1.8rem"} color={"#f03e3e"} />
                  </Box>
                </Flex>
              ))}
            </Grid>
          </Grid>
          <Box>{renderedNavList.slice(-1)}</Box>
        </VStack>
      </Center>
    </>
  );
};
