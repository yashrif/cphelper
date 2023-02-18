import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { cfProblemURL, proxyUrl } from "../../common/utils";
import "./Problem.css";

export const Problem = () => {
  const [pageData, setPageData] = useState(Object);

  const { id, index } = useParams();

  useEffect(() => {
    (async () => {
      setPageData(
        await axios.get(`${proxyUrl}/${cfProblemURL}/${id}/${index}`)
      );
    })();
  }, []);

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
        pr={"32"}
        overflowY={"scroll"}
        dangerouslySetInnerHTML={{ __html: pageData?.data }}
      ></Box>
    </>
  );
};
