import { useEffect, useState } from "react";
import { Box, Input, InputGroup, InputRightElement, Spinner, Text } from "@chakra-ui/react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateProblemRatingAndStore } from "../../store/actions/cf/cfActions";

export const ProblemRating = () => {
  const [isCheckmark, setIsCheckmark] = useState(true);

  const dispatch: any = useAppDispatch();

  const problemRating = useAppSelector((state) => state.cf.problemRating);

  useEffect(() => {
    dispatch(updateProblemRatingAndStore());
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (problemRating)
      timer = setTimeout(() => {
        setIsCheckmark(false);
      }, 1500);

    return () => clearTimeout(timer);
  }, [problemRating]);

  return (
    <>
      <Text fontSize={"lg"} fontWeight={"medium"} color={"font.muted"}>
        Problem Rating:
      </Text>

      <InputGroup w={"3xs"}>
        <InputRightElement pointerEvents="none" mx={"8"} my={"2px"}>
          {!problemRating ? (
            <Spinner
              thickness="3px"
              speed="0.65s"
              emptyColor="gray.200"
              color="primary.500"
              size="lg"
            />
          ) : (
            <Box transition={"all .3s"} opacity={isCheckmark ? 1 : 0}>
              <IoMdCheckmarkCircleOutline color="#37b24d" size={"2.4rem"} />
            </Box>
          )}
        </InputRightElement>
        <Input
          placeholder="min - max"
          _placeholder={{
            color: "font.muted3"
          }}
          px={"16"}
          size={"lg"}
          borderColor={"primary.400"}
          step={5}
          w="full"
          isReadOnly={true}
          value={problemRating ? `${problemRating?.min} - ${problemRating?.max}` : ""}
        />
      </InputGroup>
    </>
  );
};
