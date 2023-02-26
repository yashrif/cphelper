import { Box, Spinner, Text } from "@chakra-ui/react";

import { RatingSlider } from "./RatingSlider";
import { TagFilter } from "./TagFilter";
import { AdditionalOptions } from "./AdditionalOptions";
import { useAppSelector } from "../../hooks/hooks";
import { Loading } from "../../common/types";

export const ProblemFilter = () => {
  const isLoaded = useAppSelector(
    (state) =>
      state.cf.loading.problemTags.load === Loading.SUCCEEDED &&
      state.cf.loading.problemRating.load === Loading.SUCCEEDED
  );

  return (
    <Box
      boxShadow={"0.8rem 1.2rem 2.4rem rgba(28, 126, 214, .1)"}
      backgroundColor={"bg"}
      px={"16"}
      py={"12"}
      borderRadius={"lg"}
      position={"relative"}
    >
      <Text color="font.focused" fontSize={"2xl"} fontWeight={"semibold"} mb={"16"}>
        Filter Problems
      </Text>

      {!isLoaded ? (
        <Box position={"absolute"} top={"50%"} left={"50%"} transform={"translate(-50%, -50%)"}>
          <Spinner
            thickness=".3rem"
            speed="0.5s"
            emptyColor="primary.100"
            color="primary.500"
            size="xl"
          />
        </Box>
      ) : null}

      <Box alignItems={"stretch"} opacity={isLoaded ? 1 : 0}>
        <Box mb={"24"}>
          <RatingSlider />
        </Box>

        <Box mb={"32"}>
          <TagFilter />
        </Box>

        <AdditionalOptions />
      </Box>
    </Box>
  );
};
