import { useEffect } from "react";
import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import kute from "kute.js";
import { useNavigate } from "react-router-dom";
import { IoChevronForwardOutline } from "react-icons/io5";

import { Handle } from "../reusable/Handle";
import { ProblemRating } from "../reusable/ProblemRating";
import { ProblemTags } from "../reusable/ProblemTags";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Loading } from "../../common/types";
import { setAndStoreHandle } from "../../store/slices/settingsSlice";

export const GettingStarted = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handle = useAppSelector((state) => state.utils.updatedHandle);
  const isUserFetched = useAppSelector((state) => state.cf.loading.user === Loading.SUCCEEDED);

  useEffect(() => {
    /* ---------------------- TODO: Set Timer for each wave ---------------------- */

    kute
      .fromTo(
        "#wave1",
        { path: "#wave1" },
        { path: "#wave4" },
        { repeat: 99999, duration: 1200, yoyo: true }
      )
      .start();

    kute
      .fromTo(
        "#wave2",
        { path: "#wave2" },
        { path: "#wave3" },
        { repeat: 99999, duration: 1500, yoyo: true }
      )
      .start();

    kute
      .fromTo(
        "#wave3",
        { path: "#wave3" },
        { path: "#wave4" },
        { repeat: 99999, duration: 2200, yoyo: true }
      )
      .start();
  }, []);

  return (
    <GridItem
      colSpan={2}
      w={"full"}
      h={"full"}
      position={"relative"}
      overflow={"hidden"}
      backgroundColor={"#ebf7f"}
    >
      <svg
        height={"30%"}
        width={"100%"}
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          id="wave1"
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          opacity=".25"
          className="shape-fill"
          fill="#62b1ff"
          fillOpacity="1"
        ></path>
        <path
          id="wave2"
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          opacity=".5"
          className="shape-fill"
          fill="#62b1ff"
          fillOpacity="1"
        ></path>
        <path
          id="wave3"
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          className="shape-fill"
          fill="#62b1ff"
          fillOpacity="1"
        ></path>
        <path
          id="wave4"
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          opacity=".5"
          className="shape-fill"
          fillOpacity="1"
          visibility="hidden"
        ></path>
      </svg>

      <Box
        flexDirection={"column"}
        px={"16"}
        py={"36"}
        overflow={"hidden"}
        position={"absolute"}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
      >
        <Text
          textAlign={"center"}
          fontSize={"6xl"}
          fontWeight={"semibold"}
          color={"primary.700"}
          letterSpacing={"tight"}
          lineHeight={"shorter"}
          mb={"64"}
        >
          Welcome to CPHelper
        </Text>

        <Grid
          h={"full"}
          w={"full"}
          templateColumns={"auto 1fr"}
          justifyContent={"stretch"}
          alignItems={"center"}
          columnGap={"24"}
          rowGap={"36"}
        >
          <Handle />
          <ProblemRating />
          <ProblemTags />

          <GridItem colSpan={2} justifySelf={"center"}>
            <Button
              boxSize={"4.4rem"}
              alignSelf={"center"}
              borderRadius={"full"}
              loadingText="Redirecting"
              backgroundColor={"primary.500"}
              variant="solid"
              _hover={{
                boxShadow: "0 1.2rem 2rem rgba(28, 127, 214, 0.75)"
              }}
              onClick={() => {
                if (handle && handle.length > 0 && isUserFetched) {
                  dispatch(setAndStoreHandle(handle));
                  navigate("/");
                }
              }}
            >
              <IoChevronForwardOutline color={"#fff"} size={"2.8rem"} />
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </GridItem>
  );
};
