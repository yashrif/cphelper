import React, { useEffect, useState } from "react";
import { Box, Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { lastIndexOf } from "lodash";

import { Loading, Problem } from "../../common/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchProblemSet } from "../../store/slices/cfSlice";

export const ProblemTable = () => {
  const PROBLEM_NAME_MAX_LENGTH = 25;
  const PROBLEM_TAG_MAX_LENGTH = 40;
  const [numberOfProblemsPerPage, setNumberOfProblemsPerPage] = useState(20);
  const [problemSetIndexStart, setProblemSetIndexStart] = useState(0);
  const useDispatch = useAppDispatch();
  const problemSet = useAppSelector((state) => {
    {
      const problemSet = state.cf.problemSet;
      if (problemSet) {
        // const endingIndex =
        //   problemSetIndexStart + numberOfProblemsPerPage >= problemSet?.length
        //     ? problemSet.length - 1
        //     : problemSetIndexStart + numberOfProblemsPerPage;

        return state.cf.problemSet.slice(
          problemSetIndexStart,
          problemSetIndexStart + numberOfProblemsPerPage
        );
      }

      return [];
    }
  });
  const isProblemSet = useAppSelector((state) => state.cf.loading.problemSet);

  useEffect(() => {
    useDispatch(fetchProblemSet());
  }, []);

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
        lastIndexOf(
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

  const renderProblems = (problems: Problem[]) =>
    problems.map((problem, index) => (
      <Tr key={index} fontSize={"lg"}>
        <Td px={"12"} textAlign={"center"}>
          {problem.contestId + problem.index}
        </Td>
        <Td px={"12"}>
          {problem.name.slice(0, PROBLEM_NAME_MAX_LENGTH) +
            (problem.name.length > PROBLEM_NAME_MAX_LENGTH ? "..." : "")}
        </Td>
        <Td px={"12"} fontSize={"md"}>
          {makeSlice(...problem.tags).map((tag, index) => (
            <Text key={index}>{tag}</Text>
          ))}
        </Td>
        <Td px={"12"} textAlign={"center"}>
          {problem.rating}
        </Td>
        <Td px={"12"} textAlign={"center"}>
          {problem.solvedCount}
        </Td>
      </Tr>
    ));

  return (
    <Box height={"full"} overflowY={"scroll"} pr={"0"}>
      {isProblemSet === Loading.SUCCEEDED && (
        <Table variant="striped" colorScheme="secondary" size={"lg"}>
          <Thead>
            <Tr>
              {["Id", "Problem Name", "Tags", "Rating", "Solved Count"].map(
                (title, index) => (
                  <Th
                    key={index}
                    fontSize={"xl"}
                    textTransform={"capitalize"}
                    px={"12"}
                    py={"8"}
                  >
                    {title}
                  </Th>
                )
              )}
            </Tr>
          </Thead>
          <Tbody>{renderProblems(problemSet)}</Tbody>
        </Table>
      )}
    </Box>
  );
};
