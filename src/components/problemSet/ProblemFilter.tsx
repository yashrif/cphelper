import React, { useState } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";

import { RatingSlider } from "./RatingSlider";
import { TagFilter } from "./TagFilter";
import { AdditionalOptions } from "./AdditionalOptions";

export const ProblemFilter = () => {
  const [isLoadingFinished, setIsLoadingFinished] = useState([false, false]);

  return (
    <Box
      boxShadow={"0.8rem 1.2rem 2.4rem rgba(28, 126, 214, .1)"}
      backgroundColor={"bg"}
      px={"16"}
      py={"12"}
      borderRadius={"lg"}
      position={"relative"}
    >
      <Text
        color="font.focused"
        fontSize={"2xl"}
        fontWeight={"semibold"}
        mb={"16"}
      >
        Filter Problems
      </Text>

      {!isLoadingFinished[0] && !isLoadingFinished[1] ? (
        <Box
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
        >
          <Spinner
            thickness=".3rem"
            speed="0.5s"
            emptyColor="primary.100"
            color="primary.500"
            size="xl"
          />
        </Box>
      ) : null}

      <Box
        alignItems={"stretch"}
        opacity={isLoadingFinished[0] && isLoadingFinished[1] ? 1 : 0}
      >
        <Box mb={"24"}>
          <RatingSlider setIsLoadingFinished={setIsLoadingFinished} />
        </Box>

        <Box mb={"32"}>
          <TagFilter setIsLoadingFinished={setIsLoadingFinished} />
        </Box>

        <AdditionalOptions />
      </Box>
    </Box>
  );
};
