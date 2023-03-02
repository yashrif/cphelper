import { useEffect, useState } from "react";
import { Box, Flex, Input, InputGroup, InputRightElement, Spinner, Text } from "@chakra-ui/react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoSyncOutline } from "react-icons/io5";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateProblemRatingAndStore } from "../../store/actions/cf/cfActions";
import { Loading } from "@renderer/common/types";

export const ProblemRating = () => {
  const [isCheckmark, setIsCheckmark] = useState(true);

  const dispatch = useAppDispatch();

  const problemRating = useAppSelector((state) => state.cf.problemRating);
  const isProblemRatingFetched = useAppSelector((state) => state.cf.loading.problemRating.fetch);

  useEffect(() => {
    dispatch(updateProblemRatingAndStore());
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isProblemRatingFetched === Loading.SUCCEEDED) {
      setIsCheckmark(true);
      timer = setTimeout(() => {
        setIsCheckmark(false);
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [isProblemRatingFetched]);

  return (
    <>
      <Text fontSize={"lg"} fontWeight={"medium"} color={"font.muted"}>
        Problem Rating:
      </Text>

      <Flex alignItems={"center"} gap={"16"}>
        <InputGroup w={"3xs"}>
          <InputRightElement pointerEvents="none" mx={"8"} my={"2px"}>
            {isProblemRatingFetched === Loading.PENDING ? (
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

        <Box
          cursor={"pointer"}
          onClick={() => {
            dispatch(updateProblemRatingAndStore());
          }}
        >
          <IoSyncOutline color="#1c7ed6" size={"2.4rem"} />
        </Box>
      </Flex>
    </>
  );
};
