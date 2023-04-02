import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  keyframes,
  Text
} from "@chakra-ui/react";
import { IoSyncOutline } from "react-icons/io5";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateProblemRatingAndStore } from "../../store/actions/cf/cfActions";
import { Loading } from "@renderer/common/types";

export const ProblemRating = () => {
  const [isSpin, setIsSpin] = useState(true);

  const dispatch = useAppDispatch();

  const problemRating = useAppSelector((state) => state.cf.problemRating);
  const isProblemRatingFetched = useAppSelector((state) => state.cf.loading.problemRating.fetch);

  useEffect(() => {
    dispatch(updateProblemRatingAndStore());
  }, []);

  useEffect(() => {
    if (isProblemRatingFetched === Loading.SUCCEEDED) setIsSpin(false);
  }, [isProblemRatingFetched]);

  const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;

  const spinAnimation = `${spin} infinite 1s linear`;

  return (
    <>
      <Text fontSize={"lg"} fontWeight={"medium"} color={"font.muted"}>
        Problem Rating:
      </Text>

      <Flex alignItems={"center"} gap={"16"}>
        <InputGroup w={"3xs"}>
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
          animation={isSpin ? spinAnimation : ""}
          cursor={"pointer"}
          onClick={() => {
            dispatch(updateProblemRatingAndStore());
            setIsSpin(true);
          }}
        >
          <IoSyncOutline color="#1c7ed6" size={"2.4rem"} />
        </Box>
      </Flex>
    </>
  );
};
