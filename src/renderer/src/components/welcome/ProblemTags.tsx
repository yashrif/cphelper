import { useEffect, useState } from "react";
import { Box, InputGroup, InputRightElement, Select, Spinner, Text } from "@chakra-ui/react";
import _ from "lodash";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateProblemTagsAndStore } from "../../store/actions/cf/cfActions";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export const ProblemTags = () => {
  const [isCheckmark, setIsCheckmark] = useState(true);

  const dispatch: any = useAppDispatch();

  const problemTags = useAppSelector((state) => state.cf.problemTags);

  useEffect(() => {
    dispatch(updateProblemTagsAndStore());
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (problemTags)
      timer = setTimeout(() => {
        setIsCheckmark(false);
      }, 1500);

    return () => clearTimeout(timer);
  }, [problemTags]);

  return (
    <>
      <Text fontSize={"lg"} fontWeight={"medium"} color={"font.muted"}>
        Problem Tags:
      </Text>

      <InputGroup w={"3xs"}>
        <InputRightElement pointerEvents="none" mx={"8"} my={"2px"}>
          {!problemTags ? (
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
          iconColor={isCheckmark ? "transparent" : "font.general"}
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
    </>
  );
};
