import React, { useEffect, useState } from "react";
import { Box, Select, Text } from "@chakra-ui/react";
import _ from "lodash";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchProblemTags } from "../../store/slices/cfSlice";

export const ProblemFilter = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags = useAppSelector((state) => state.cf.problemTags);
  const useDispatch = useAppDispatch();

  useEffect(() => {
    useDispatch(fetchProblemTags());
  }, []);

  console.log(selectedTags);

  return (
    <Box backgroundColor={"bg2"} px={"16"} py={"8"} borderRadius={"lg"}>
      <Text
        color="font.focused"
        fontSize={"2xl"}
        fontWeight={"semibold"}
        mb={"16"}
      >
        Filter Problems
      </Text>
      
      <Select
        placeholder="Select option"
        size={"lg"}
        fontSize={"lg"}
        fontWeight={"medium"}
        onChange={(e) => {
          setSelectedTags((prevState) => [...prevState, e?.target.value]);
        }}
      >
        {tags?.map((tag, index) => (
          <option key={index} value={tag}>
            {_.capitalize(tag)}
          </option>
        ))}
      </Select>
    </Box>
  );
};
