import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  HStack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import _ from "lodash";
import {IoAddCircleOutline}

import { Loading, Problem } from "../../common/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchProblemSet } from "../../store/actions/cf/cfApiActions";

export const ProblemTable = () => {
  const navigate = useNavigate();

  const PROBLEM_NAME_MAX_LENGTH = 25;
  const PROBLEM_TAG_MAX_LENGTH = 40;

  const [filteredProblemSetAll, setFilteredProblemSetAll] = useState<Problem[]>(
    []
  );
  const [filteredProblemSet, setFilteredProblemSet] = useState<Problem[]>([]);
  const [problemSetIndexStart, setProblemSetIndexStart] = useState(0);

  const dispatch = useAppDispatch();
  const selectedProblemTags = useAppSelector(
    (state) => state.component.selectedProblemTags
  );
  const problemSet = useAppSelector((state) => state.cf.problemSet);
  const isProblemSet = useAppSelector((state) => state.cf.loading.problemSet);
  const problemRatingRange = useAppSelector(
    (state) => state.component.problemRatingRange
  );
  const problemsPerPage = useAppSelector(
    (state) => state.component.problemsPerPage
  );

  useEffect(() => {
    dispatch(fetchProblemSet(selectedProblemTags));
  }, [selectedProblemTags]);

  useEffect(() => {
    setFilteredProblemSetAll(
      _.filter(
        problemSet,
        (value) =>
          value.rating >= problemRatingRange[0] &&
          value.rating <= problemRatingRange[1]
      )
    );
  }, [problemRatingRange, problemSet]);

  useEffect(() => {
    setFilteredProblemSet(
      filteredProblemSetAll.slice(
        problemSetIndexStart,
        problemSetIndexStart + problemsPerPage
      )
    );
  }, [filteredProblemSetAll, problemsPerPage]);

  const makeSlice = (...args: string[]) => {
    const tagString = args.join(", ");

    let indexStart = 0;
    const newTagString: string[] = [];

    for (let i = 0; i < (tagString.length / 2) * 2; i++) {
      if (indexStart + PROBLEM_TAG_MAX_LENGTH >= tagString.length) {
        newTagString.push(tagString.slice(indexStart));
        break;
      }

      const lastIndex =
        _.lastIndexOf(
          tagString.slice(indexStart, indexStart + PROBLEM_TAG_MAX_LENGTH),
          ","
        ) + 1;

      const sliceLength =
        lastIndex > PROBLEM_TAG_MAX_LENGTH ? PROBLEM_TAG_MAX_LENGTH : lastIndex;

      newTagString.push(tagString.slice(indexStart, indexStart + sliceLength));
      indexStart += lastIndex;
    }

    return newTagString;
  };

  const renderTags = (tags: string[]) =>
    tags.map((tag, index) => (
      <Tag
        key={index}
        size={"md"}
        borderRadius="full"
        variant="solid"
        // colorScheme="primary"
        // backgroundColor={"primary.400"}
        background={
          "linear-gradient(90deg, hsla(210, 90%, 80%, .85) 0%, hsla(212, 93%, 49%, .9) 100%)"
        }
        m={"0 !important"}
      >
        <TagLabel px={"4"} py={"2"}>
          {tag}
        </TagLabel>
      </Tag>
    ));

  const renderProblems = (problems: Problem[]) =>
    problems.map((problem, index) => (
      <Tr
        key={index}
        fontSize={"lg"}
        cursor={"pointer"}
        transition={"all .3s"}
        overflow={"hidden"}
        backgroundColor={"transparent"}
        _hover={{
          transform: "scale(1.03)",
          background:
            "linear-gradient(90deg, hsla(210, 90%, 80%, 0.5) 0%, hsla(212, 93%, 49%, 0.75) 100%)",
        }}
        onClick={() => {
          // dispatch(
          //   setSelectedProblemUrl([problem.contestId.toString(), problem.index])
          // );

          navigate(`/problemset/problem/${problem.contestId}/${problem.index}`);
        }}
      >
        <Td px={"12"} textAlign={"center"} borderLeftRadius={"md"}>
          {problem.contestId + problem.index}
        </Td>
        <Td px={"12"}>
          <Text mb={"12"}>
            {problem.name.slice(0, PROBLEM_NAME_MAX_LENGTH) +
              (problem.name.length > PROBLEM_NAME_MAX_LENGTH ? "..." : "")}
          </Text>
          <HStack gap={"4"} wrap={"wrap"} justifyContent={"end"}>
            {renderTags(problem.tags)}
          </HStack>
        </Td>
        {/* <Td px={"12"} fontSize={"md"}>
          {makeSlice(...problem.tags).map((tag, index) => (
            <Text key={index}>{tag}</Text>
          ))}
        </Td> */}
        <Td px={"12"} textAlign={"center"}>
          {problem.rating}
        </Td>
        <Td px={"12"} textAlign={"center"} borderRightRadius={"md"}>
          {problem.solvedCount}
        </Td>
        <Td>

        </Td>
      </Tr>
    ));

  return (
    <Box height={"full"} overflowX={"hidden"} overflowY={"scroll"} pr={"0"}>
      {isProblemSet === Loading.SUCCEEDED && (
        <Table
          colorScheme="problemTable"
          size={"lg"}
          style={{ borderCollapse: "collapse" }}
        >
          <Thead>
            <Tr>
              {["Id", "Problem Name", "Rating", "Solved Count", "as"].map(
                (title, index) => (
                  <Th
                    key={index}
                    color={"primary.600"}
                    fontSize={"xl"}
                    textTransform={"capitalize"}
                    textAlign={"center"}
                    px={"8"}
                    py={"16"}
                  >
                    {title}
                  </Th>
                )
              )}
            </Tr>
          </Thead>
          <Tbody>{renderProblems(filteredProblemSet)}</Tbody>
        </Table>
      )}
    </Box>
  );
};
