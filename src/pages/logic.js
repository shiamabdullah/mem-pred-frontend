// @flow strict

import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import LogicPrediction from '../components/prediction/logic-prediction';
import BuildOutputResult from '../components/prediction/output-result';
import HomeLayout from '../layout/home-layout';
import { selectLoading } from '../redux/reducer/layoutSlice';
import { selectLogicOutput } from '../redux/reducer/logicSlice';

function Logic() {
  const [isExpanded, setExpanded] = useState(false);
  const logicOutput = useSelector(selectLogicOutput);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  function isNotEmpty(obj) {
    return Object.keys(obj).length > 0;
  }

  return (
    <>
      <HomeLayout>
        {
          isNotEmpty(logicOutput) ?
            <Accordion
              className="rounded-lg mt-5 border-none"
              expanded={isExpanded}
              onChange={(e, f) => setExpanded(f)}>
              <AccordionSummary
                expandIcon={<IoMdArrowDropdown
                  className="text-2xl text-[#F24E1E]"
                />}
              >
                <h3
                  className="text-left font-medium my-0 py-0 text-[#84828A] text-xl">Input</h3>
              </AccordionSummary>
              <AccordionDetails>
                <div className="p-3">
                  <LogicPrediction />
                </div>
              </AccordionDetails>
            </Accordion>
            :
            <div className="p-3">
              <LogicPrediction />
            </div>
        }
        {
          isNotEmpty(logicOutput)
          &&
          <div className="relative">
            <h3 className="text-left font-medium p-2 text-[#84828A] text-xl">
              Output
            </h3>
            <div className="grid grid-cols-2 gap-2 gap-y-4 mt-3">
              <div className="shadow-[0_5px_20px_rgba(0,0,0,0.05)]  rounded-lg">
                {loading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <BuildOutputResult data={logicOutput} />
                )}
              </div>
            </div>
          </div>
        }
      </HomeLayout>
    </>
  );
};

export default Logic;