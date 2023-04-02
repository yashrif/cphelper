import { useEffect, useState } from "react";
import { Box, Flex, InputGroup, keyframes, Select, Text } from "@chakra-ui/react";
import _ from "lodash";
import { IoSyncOutline } from "react-icons/io5";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateProblemTagsAndStore } from "../../store/actions/cf/cfActions";
import { Loading } from "@renderer/common/types";

export const ProblemTags = () => {
  const [isSpin, setIsSpin] = useState(true);

  const dispatch = useAppDispatch();

  const problemTags = useAppSelector((state) => state.cf.problemTags);
  const isProblemTagsFetched = useAppSelector((state) => state.cf.loading.problemTags.fetch);

  useEffect(() => {
    dispatch(updateProblemTagsAndStore());
  }, []);

  useEffect(() => {
    if (isProblemTagsFetched === Loading.SUCCEEDED) setIsSpin(false);
  }, [isProblemTagsFetched]);

  const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;

  const spinAnimation = `${spin} infinite 1s linear`;

  return (
    <>
      <Text fontSize={"lg"} fontWeight={"medium"} color={"font.muted"}>
        Problem Tags:
      </Text>

      <Flex alignItems={"center"} gap={"16"}>
        <InputGroup w={"3xs"}>
          <Select
            transition={"all .3s"}
            iconColor={
              isSpin || isProblemTagsFetched === Loading.PENDING ? "transparent" : "font.general"
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
          animation={isSpin ? spinAnimation : ""}
          cursor={"pointer"}
          onClick={() => {
            dispatch(updateProblemTagsAndStore());
            setIsSpin(true);
          }}
        >
          <IoSyncOutline color="#1c7ed6" size={"2.4rem"} />
        </Box>
      </Flex>
    </>
  );
};
