// @flow strict
import { Box, Button, CircularProgress, Tooltip } from "@mui/material";
import * as React from "react";
import { CSVLink } from "react-csv";
import { MdOutlineFileDownload, MdSave } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentState,
  selectLoading,
} from "../../redux/reducer/layoutSlice";
import { selectLogicOutput } from "../../redux/reducer/logicSlice";
import {
  selectMemoryOutput,
  selectMultipleOutput,
} from "../../redux/reducer/memorySlice";
import { updateSaveResult } from "../../redux/reducer/resultSlice";
import ChartsContainer from "../charts/ChartsContainer";
import BuildOutputResult from "./output-result";

function PredictionOutput() {
  const dispatch = useDispatch();
  const currentState = useSelector(selectCurrentState);
  const logicOutput = useSelector(selectLogicOutput);
  const memoryOutput = useSelector(selectMemoryOutput);
  const loading = useSelector(selectLoading);
  const multipleOutput = useSelector(selectMultipleOutput);

  const output =
    currentState === "logic" ? logicOutput || {} : memoryOutput || {};

  const properties = Object.entries(output);

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
    const newResult = { name: generateFileName(output), data: output };
    dispatch(updateSaveResult(newResult));
  };

  return (
    <div className="relative">
      <h3 className="text-left font-medium p-2 text-[#84828A] text-xl">
        Output
      </h3>
      <div className="flex justify-end items-center mb-2">
        {currentState === "memory" && (
          <div className="flex gap-2">
            <Tooltip title="Save Result" placement="top">
              <Button onClick={handleSaveResult} className="p-1 min-w-fit">
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
        )}
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
            <BuildOutputResult
              data={currentState === "logic" ? logicOutput : memoryOutput}
            />
          )}
        </div>
        <div className="">
          {currentState === "memory" && <ChartsContainer data={output} />}
        </div>
      </div>
    </div>
  );
}

export default PredictionOutput;
