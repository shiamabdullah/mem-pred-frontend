// @flow strict

import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import * as React from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useSelector } from 'react-redux';
import HomeLayout from '../../layout/home-layout';
import { selectCurrentState } from '../../redux/reducer/layoutSlice';
import { selectLogicOutput } from '../../redux/reducer/logicSlice';
import { selectMemoryOutput, selectMultipleOutput } from '../../redux/reducer/memorySlice';
import PredictionInput from './prediction-input';
import PredictionOutput from './prediction-output';

function Prediction() {
  const [isExpanded, setExpanded] = React.useState(false);
  const logicOutput = useSelector(selectLogicOutput);
  const memoryOutput = useSelector(selectMemoryOutput);
  const currentState = useSelector(selectCurrentState);
  const multipleOutput = useSelector(selectMultipleOutput);

  console.log(multipleOutput)

  function isNotEmpty(obj) {
    return Object.keys(obj).length > 0;
  }

  return (
    <>
      <HomeLayout>
        {
          (
            ((isNotEmpty(memoryOutput) || multipleOutput.length > 0) && currentState === 'memory')
            || (isNotEmpty(logicOutput) && currentState === 'logic')) ?
            <Accordion expanded={isExpanded} onChange={(e, f) => setExpanded(f)}>
              <AccordionSummary
                expandIcon={<IoMdArrowDropdown className="text-2xl text-[#F24E1E]" />}
              >
                <Typography>Input</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <PredictionInput />
              </AccordionDetails>
            </Accordion>
            :
            <PredictionInput />
        }
        {
          ((isNotEmpty(memoryOutput) && currentState === 'memory')
            || (isNotEmpty(logicOutput) && currentState === 'logic')) && <PredictionOutput />
        }
      </HomeLayout>
    </>
  );
};

export default Prediction;