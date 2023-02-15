import React, { useEffect } from "react";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchUser } from "../../store/cfSlice";
import { BlobAnimation } from "./BlobAnimation";
import { WaveAnimation } from "./WaveAnimation";
import { RightPanel } from "./RightPanel";
import { RatingCurve } from "./RatingCurve";

export const Home = () => {
  const useDispatch = useAppDispatch();
  const user = useAppSelector((state) => state.cf.user);

  useEffect(() => {
    useDispatch(fetchUser("Yashrif"));
  }, []);

  return (
    <Grid
      maxW={"container.xl"}
      h={"full"}
      templateColumns={"3fr 1fr"}
      columnGap={"36"}
    >
      <Box>
        <WaveAnimation />

        <Flex columnGap={"96"}>
          <Box
            position={"relative"}
            display={"inline-block"}
            top={"-7rem"}
            left={"40"}
            zIndex={"5"}
          >
            <Image
              src={user?.titlePhoto}
              boxSize={"xs"}
              objectFit={"cover"}
              borderRadius={"full"}
            />

            {<BlobAnimation />}
          </Box>
          <Box py={"8"} fontWeight={"semibold"} lineHeight={"short"}>
            <Text fontSize={"2xl"}>
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

      <RightPanel />
    </Grid>
  );
};
