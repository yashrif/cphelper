import React, { useEffect, useState } from "react";
import { Select } from "chakra-react-select";
import _ from "lodash";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateSelectedProblemTags } from "../../store/slices/utilsSlice";
import { loadProblemTags } from "../../store/actions/cf/cfDbActions";

export const TagFilter = () => {
  const [customizedTags, setCustomizedTags] = useState(Object);
  const [selectedTags, setSelectedTags] = useState({});

  const dispatch = useAppDispatch();

  const problemTags = useAppSelector((state) => state.cf.problemTags);

  useEffect(() => {
    dispatch(loadProblemTags());
  }, []);

  useEffect(() => {
    setCustomizedTags(
      problemTags?.map((tag) => ({
        label: _.capitalize(tag),
        value: tag,
      }))
    );
  }, [problemTags]);

  useEffect(() => {
    dispatch(
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
