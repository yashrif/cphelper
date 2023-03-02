import { useEffect, useState } from "react";
import { Box, Flex, InputGroup, InputRightElement, Select, Spinner, Text } from "@chakra-ui/react";
import _ from "lodash";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoSyncOutline } from "react-icons/io5";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateProblemTagsAndStore } from "../../store/actions/cf/cfActions";
import { Loading } from "@renderer/common/types";

export const ProblemTags = () => {
  const [isCheckmark, setIsCheckmark] = useState(true);

  const dispatch = useAppDispatch();

  const problemTags = useAppSelector((state) => state.cf.problemTags);
  const isProblemTagsFetched = useAppSelector((state) => state.cf.loading.problemTags.fetch);

  useEffect(() => {
    dispatch(updateProblemTagsAndStore());
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isProblemTagsFetched === Loading.SUCCEEDED) {
      setIsCheckmark(true);
      timer = setTimeout(() => {
        setIsCheckmark(false);
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [isProblemTagsFetched]);

  return (
    <>
      <Text fontSize={"lg"} fontWeight={"medium"} color={"font.muted"}>
        Problem Tags:
      </Text>

      <Flex alignItems={"center"} gap={"16"}>
        <InputGroup w={"3xs"}>
          <InputRightElement pointerEvents="none" mx={"8"} my={"2px"}>
            {isProblemTagsFetched === Loading.PENDING ? (
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

          <Select
            transition={"all .3s"}
            iconColor={
              isCheckmark || isProblemTagsFetched === Loading.PENDING
                ? "transparent"
                : "font.general"
            }
            isReadOnly={true}
            placeholder="Tags"
            _placeholder={{
              color: "font.muted3"
            }}
            size={"lg"}
            borderColor={"primary.400"}
            w={"3xs"}
          >
            {problemTags?.map((tag) => (
              <option key={tag} value={tag}>
                {_.capitalize(tag)}
              </option>
            ))}
          </Select>
        </InputGroup>

        <Box
          cursor={"pointer"}
          onClick={() => {
            dispatch(updateProblemTagsAndStore());
          }}
        >
          <IoSyncOutline color="#1c7ed6" size={"2.4rem"} />
        </Box>
      </Flex>
    </>
  );
};
