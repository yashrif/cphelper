import React from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { cfProblemURL } from "../../common/utils";
import "./Problem.css";

export const Problem = () => {
  const { id, index } = useParams();

  return (
    <>
      <style>
        {`
            ::-webkit-scrollbar {
                display: none;
              }
        `}
      </style>
      <Box
        id={"problem"}
        h={"full"}
        w={"full"}
        pl={"16"}
        // pr={"32"}
        overflowY={"scroll"}
      >
        <webview
          src={`${cfProblemURL}/${id}/${index}`}
          style={{ height: "100%", width: "100%" }}
        ></webview>
        <webview
          src={`${cfProblemURL}`}
          style={{ height: "100%", width: "100%" }}
        ></webview>
      </Box>
    </>
  );
};
