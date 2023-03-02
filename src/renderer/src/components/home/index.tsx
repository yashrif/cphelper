import { Box, Grid } from "@chakra-ui/react";

import { WaveAnimation } from "./WaveAnimation";
import { RightPanel } from "./RightPanel";
import { RatingCurve } from "./RatingCurve";
import { User } from "./User";

export const Home = () => {
  return (
    <Grid w={"full"} h={"full"} templateColumns={"1fr auto"} overflow={"hidden"}>
      <style>
        {`
          ::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <Box w={"full"} overflowY={"scroll"} px={"16"} py={"36"}>
        <WaveAnimation />

        <User />

        <RatingCurve />
      </Box>

      <Box minW={"md"} maxW={"lg"} px={"16"} py={"36"}>
        <RightPanel />
      </Box>
    </Grid>
  );
};
