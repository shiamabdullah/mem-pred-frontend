// @flow strict
import { Box, Button, CircularProgress, Tooltip } from "@mui/material";
import * as React from "react";
import { CSVLink } from "react-csv";
import { MdOutlineFileDownload, MdSave } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading } from "../../redux/reducer/layoutSlice";
import { selectMultipleOutput } from "../../redux/reducer/memorySlice";
import getCsvHeadersMultipleData from "../../utils/helper/getCsvHeaders";
import BuildOutputResult from "./output-result";

function MultipleOutput() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const multipleOutput = useSelector(selectMultipleOutput);
  const csvHeaders = getCsvHeadersMultipleData(multipleOutput);
  // const properties = Object.entries(output);

  // const getHeader = (data) => {
  //   const temp = []
  //   Object.keys(data).map(item => temp.push({ label: item, key: item }))
  //   return temp
  // }

  // function generateFileName(result) {
  //   const fileName = ((result?.Words * result?.Bits) / 1024).toFixed(3) + "kb" + "_" + result?.Mem_Type + "_" + result?.Vendor + "_words-" + result?.Words + "_bits-" + result?.Bits + "_mux-" + result?.Mux + "_banks-" + result?.Banks + "_vt-" + result?.Vt_Type + "_" + result?.HD_or_HS
  //   return fileName
  // }

  // const newData = Object.fromEntries(
  //   Object.entries(output).map(([key, value]) => {
  //     return [
  //       key,
  //       value,
  //     ];
  //   })
  // );

  // const handleSaveResult = () => {
  //   const newResult = { name: generateFileName(output), data: output }
  //   dispatch(updateSaveResult(newResult))
  // }

  return (
    <div className="relative">
      <h3 className="text-left font-medium p-2 text-[#84828A] text-xl">
        Output
      </h3>
      <div className="flex justify-end items-center mb-2">
        <div className="flex gap-2">
          <Tooltip title="Save Result" placement="top">
            <Button className="p-1 min-w-fit">
              <MdSave className="text-xl text-[#F24E1E]" />
            </Button>
          </Tooltip>

          <Tooltip title="Download CSV" placement="top">
            <Button className="p-0 min-w-fit">
              <CSVLink
                data={multipleOutput}
                headers={csvHeaders}
                filename={"test" + ".csv"}
                className={`inline-flex items-center`}
              >
                <MdOutlineFileDownload className="text-2xl text-[#F24E1E]" />
              </CSVLink>
              CSV
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 gap-y-4 mt-3">
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
          multipleOutput.map((item, index) => (
            <div
              key={index}
              className="shadow-[0_5px_20px_rgba(0,0,0,0.05)]  rounded-lg"
            >
              <BuildOutputResult data={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MultipleOutput;
