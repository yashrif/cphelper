import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setProblemRatingRange } from "../../store/slices/utilsSlice";
import { loadProblemRating } from "../../store/actions/cf/cfDbActions";

export const RatingSlider = () => {
  const [ratingRange, setRatingRange] = useState([800, 3500]);

  const dispatch = useAppDispatch();

  const problemRating = useAppSelector((state) => state.cf.problemRating);

  useEffect(() => {
    dispatch(loadProblemRating());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ratingRange[1] < ratingRange[0]) {
        setRatingRange((prevState) => {
          const newState = [...prevState];
          newState[0] =
            newState[1] > problemRating.min ? newState[1] : problemRating.min;

          return newState;
        });
      }

      dispatch(setProblemRatingRange(ratingRange as [number, number]));
    }, 500);

    return () => clearTimeout(timer);
  }, [ratingRange]);

  return (
    <Box>
      <Box px={"12"}>
        <RangeSlider
          aria-label={["min", "max"]}
          min={problemRating?.min}
          max={problemRating?.max}
          defaultValue={[800, 3500]}
          step={100}
          focusThumbOnChange={false}
          value={ratingRange}
          onChange={setRatingRange}
          mb={"12"}
        >
          <RangeSliderTrack bg="primary.100">
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb
            index={0}
            fontSize="sm"
            fontWeight={"medium"}
            boxSize="3.2rem"
            bg={"primary.400"}
            color={"font.light"}
            boxShadow={"0 .4rem 0.8rem rgba(0, 0, 0, .15)"}
          >
            {ratingRange[0] ? ratingRange[0] : 0}
          </RangeSliderThumb>
          <RangeSliderThumb
            index={1}
            fontSize="sm"
            fontWeight={"medium"}
            boxSize="3.2rem"
            bg={"primary.400"}
            color={"font.light"}
            boxShadow={"0 .4rem 0.8rem rgba(0, 0, 0, .15)"}
          >
            {ratingRange[1] ? ratingRange[1] : 0}
          </RangeSliderThumb>
        </RangeSlider>
      </Box>

      <Flex justifyContent={"space-between"}>
        <NumberInput
          borderColor={"primary.400"}
          step={100}
          allowMouseWheel
          keepWithinRange={true}
          maxW="8.4rem"
          min={problemRating?.min}
          max={problemRating?.max}
          defaultValue={problemRating?.min}
          value={ratingRange[0] ? ratingRange[0] : 0}
          onChange={(_, value) => {
            setRatingRange((prevState) => {
              const newState = [...prevState];
              newState[0] = value;
              return newState;
            });
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <NumberInput
          borderColor={"primary.400"}
          step={100}
          allowMouseWheel
          keepWithinRange={true}
          maxW="8.4rem"
          min={problemRating?.min}
          max={problemRating?.max}
          defaultValue={problemRating?.max}
          value={ratingRange[1] ? ratingRange[1] : 0}
          onChange={(_, value) => {
            setRatingRange((prevState) => {
              const newState = [...prevState];
              newState[1] = value;
              return newState;
            });
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
    </Box>
  );
};
