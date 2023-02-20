import React, { useEffect } from "react";
import { Box, Flex, Grid, Image as Img, Text } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchUserRatingHistoryAndStatus } from "../../store/slices/cfSlice";
import { BlobAnimation } from "./BlobAnimation";
import { WaveAnimation } from "./WaveAnimation";
import { RightPanel } from "./RightPanel";
import { RatingCurve } from "./RatingCurve";
import { generateColorPalette } from "../../store/slices/componentSlice";

export const Home = () => {
  const useDispatch = useAppDispatch();
  const handle = useAppSelector((state) => state.preferences.handle);
  const user = useAppSelector((state) => state.cf.user);

  useEffect(() => {
    handle && useDispatch(fetchUserRatingHistoryAndStatus(handle));
  }, [handle]);

  useEffect(() => {
    useDispatch(generateColorPalette({ url: user?.titlePhoto }));
  }, [user]);

  return (
    <Grid
      w={"full"}
      h={"full"}
      // py={"36"}
      templateColumns={"1fr auto"}
      // columnGap={"32"}
      overflow={"hidden"}
      // overflowY={"scroll"}
    >
      <style>
        {`
          ::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <Box w={"full"} overflowY={"scroll"} px={"16"} py={"36"}>
        <WaveAnimation />

        <Flex columnGap={"96"}>
          <Box
            position={"relative"}
            display={"inline-block"}
            top={"-7rem"}
            left={"40"}
            zIndex={"5"}
          >
            <Img
              src={user?.titlePhoto}
              boxSize={"xs"}
              objectFit={"cover"}
              borderRadius={"full"}
            />

            {<BlobAnimation />}
          </Box>

          <Box py={"8"} fontWeight={"semibold"} lineHeight={"short"}>
            <Text fontSize={"2xl"} textTransform={"capitalize"}>
              {user?.firstName} {user?.lastName}
            </Text>

            <Text
              fontSize={"lg"}
              color={"font.muted2"}
              fontWeight={"normal"}
              textTransform={"capitalize"}
            >
              {user?.rank}
            </Text>
          </Box>
        </Flex>

        <RatingCurve />
      </Box>

      <Box minW={"md"} maxW={"lg"} px={"16"} py={"36"}>
        <RightPanel />
      </Box>
    </Grid>
  );
};
