// @flow strict

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import * as React from "react";
import { CSVLink } from "react-csv";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineFileDownload, MdSave } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ChartsContainer from "../components/charts/ChartsContainer";
import MemoryPrediction from "../components/prediction/memory-prediction";
import MultipleOutput from "../components/prediction/multiple-output";
import BuildOutputResult from "../components/prediction/output-result";
import HomeLayout from "../layout/home-layout";
import { selectLoading } from "../redux/reducer/layoutSlice";
import {
  selectMemoryOutput,
  selectMultipleOutput,
} from "../redux/reducer/memorySlice";
import { updateSaveResult } from "../redux/reducer/resultSlice";

function Memory() {
  const [isExpanded, setExpanded] = React.useState(false);
  const memoryOutput = useSelector(selectMemoryOutput);
  const multipleOutput = useSelector(selectMultipleOutput);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const output = memoryOutput || {};

  const getHeader = (data) => {
    const temp = [];
    Object.keys(data).map((item) => temp.push({ label: item, key: item }));
    return temp;
  };

  function generateFileName(result) {
    const fileName =
      ((result?.Words * result?.Bits) / 1024).toFixed() +
      "kb" +
      "_" +
      result?.Mem_Type +
      "_" +
      result?.Vendor +
      "_words-" +
      result?.Words +
      "_bits-" +
      result?.Bits +
      "_mux-" +
      result?.Mux +
      "_banks-" +
      result?.Banks +
      "_vt-" +
      result?.Vt_Type +
      "_" +
      result?.HD_or_HS;
    return fileName;
  }

  const newData = Object.fromEntries(
    Object.entries(output).map(([key, value]) => {
      return [key, value];
    })
  );

  const handleSaveResult = () => {
    console.log("Saving the results", newResult);
    const newResult = { name: generateFileName(output), data: output };
    dispatch(updateSaveResult(newResult));
  };

  function isNotEmpty(obj) {
    return Object.keys(obj).length > 0;
  }

  return (
    <>
      <HomeLayout>
        {isNotEmpty(memoryOutput) || multipleOutput.length > 0 ? (
          <Accordion
            className="rounded-lg mt-5 border-none"
            expanded={isExpanded}
            onChange={(e, f) => setExpanded(f)}
          >
            <AccordionSummary
              expandIcon={
                <IoMdArrowDropdown className="text-2xl text-[#F24E1E]" />
              }
            >
              <h3 className="text-left font-medium my-0 py-0 text-[#84828A] text-xl">
                Input
              </h3>
            </AccordionSummary>
            <AccordionDetails>
              <div className="p-3">
                <MemoryPrediction />
              </div>
            </AccordionDetails>
          </Accordion>
        ) : (
          <div className="p-3">
            <MemoryPrediction />
          </div>
        )}
        {multipleOutput.length > 0 ? (
          <MultipleOutput data={multipleOutput} />
        ) : (
          isNotEmpty(memoryOutput) && (
            <div className="relative">
              <h3 className="text-left font-medium p-2 text-[#84828A] text-xl">
                Output
              </h3>
              <div className="flex justify-end items-center mb-2">
                <div className="flex gap-2">
                  <Tooltip title="Save Result" placement="top">
                    <Button
                      onClick={handleSaveResult}
                      className="p-1 min-w-fit"
                    >
                      <MdSave className="text-xl text-[#F24E1E]" />
                    </Button>
                  </Tooltip>

                  <Tooltip title="Download CSV" placement="top">
                    <Button className="p-0 min-w-fit">
                      <CSVLink
                        data={[{ ...newData }]}
                        headers={getHeader(output)}
                        filename={generateFileName(output) + ".csv"}
                        className={`inline-flex items-center`}
                      >
                        <MdOutlineFileDownload className="text-2xl text-[#F24E1E]" />
                      </CSVLink>
                    </Button>
                  </Tooltip>
                </div>
              </div>
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
                    <BuildOutputResult data={memoryOutput} />
                  )}
                </div>
                <div className="">
                  <ChartsContainer data={output} />
                </div>
              </div>
            </div>
          )
        )}
      </HomeLayout>
    </>
  );
}

export default Memory;
