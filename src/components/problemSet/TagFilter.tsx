import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import _ from "lodash";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateSelectedProblemTags } from "../../store/slices/componentSlice";
import { fetchProblemTags } from "../../store/slices/cfSlice";
import { Loading } from "../../common/types";
import { loadProblemTags } from "../../store/actions/cfDbActions";

export const TagFilter = ({ setIsLoadingFinished }: any) => {
  const [customizedTags, setCustomizedTags] = useState(Object);
  const [selectedTags, setSelectedTags] = useState({});

  const tags = useAppSelector((state) => state.cf.problemTags);
  const isTagLoaded = useAppSelector(
    (state) => state.cf.loading.problemTags.load
  );
  const useDispatch = useAppDispatch();

  useEffect(() => {
    // useDispatch(fetchProblemTags());

    useDispatch(loadProblemTags());
    // cf.loadProblemTags().then(r=>console.log(r))
  }, []);

  console.log(tags);

  useEffect(() => {
    setCustomizedTags(
      tags?.map((tag) => ({
        label: _.capitalize(tag),
        value: tag,
      }))
    );
  }, [tags]);

  useEffect(() => {
    setIsLoadingFinished((prevState: boolean[]) => {
      const newState = [...prevState];
      newState[1] = isTagLoaded === Loading.SUCCEEDED;
      return newState;
    });

    // isTagLoaded === Loading.SUCCEEDED && cf.storeProblemTags(tags)
  }, [isTagLoaded]);

  useEffect(() => {
    useDispatch(
      updateSelectedProblemTags(_.chain(selectedTags).map("value").value())
    );
  }, [selectedTags]);

  return (
    <>
      <style>{`
      .tag-selection *:focus{
          box-shadow: none;
        }
        `}</style>

      <Select
        className={"tag-selection"}
        isMulti
        name={"tags"}
        colorScheme={"primary"}
        options={customizedTags}
        placeholder={"Select tags"}
        closeMenuOnSelect={false}
        onChange={setSelectedTags}
        size={"lg"}
      />
    </>
  );
};
