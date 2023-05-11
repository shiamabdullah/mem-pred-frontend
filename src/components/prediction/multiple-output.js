// @flow strict
import { Box, Button, CircularProgress, Tooltip } from "@mui/material";
import * as React from "react";
import { CSVLink } from "react-csv";
import { MdOutlineFileDownload, MdSave } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading } from "../../redux/reducer/layoutSlice";
import { selectMemoryInput, selectMultipleOutput } from "../../redux/reducer/memorySlice";
import { updateSaveMultipleResults } from "../../redux/reducer/resultSlice";
import getCsvHeadersMultipleData from "../../utils/helper/getCsvHeaders";
import BuildOutputResult from "./output-result";

function MultipleOutput() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const multipleOutput = useSelector(selectMultipleOutput);
  const memoryInput = useSelector(selectMemoryInput);



  const csvHeaders = getCsvHeadersMultipleData(multipleOutput);

  function generateFileName(result) {
    const { words, bits, mem_type, vendor, mux, banks, vt_type, hd_or_hs } = result;
    const muxRange = (result.muxMin !== undefined && result.muxMax !== undefined) ? `${result.muxMin}-${result.muxMax}` : result.mux;
    const banksRange = (result.banksMin !== undefined && result.banksMax !== undefined) ? `${result.banksMin}-${result.banksMax}` : result.banks;
    const sizeInKb = ((words ?? 0) * (bits ?? 0) / 1024).toFixed(3);
    const fileName = `${sizeInKb}kb_${mem_type}_${vendor}_words-${words}_bits-${bits}_mux-${muxRange}_banks-${banksRange}_vt-${vt_type}_${hd_or_hs}`;
    return fileName;
  }


  const handleSaveResult = () => {
    const newResult = { name: generateFileName(memoryInput), data: multipleOutput }
    dispatch(updateSaveMultipleResults(newResult))
  }

  return (
    <div className="relative">
      <h3 className="text-left font-medium p-2 text-[#84828A] text-xl">
        Output
      </h3>
      <div className="flex justify-end items-center mb-2">
        <div className="flex gap-2">

          <Tooltip title="Save Result" placement='top'>
            <Button onClick={handleSaveResult} className="p-1 min-w-fit">
              <MdSave className="text-xl text-[#F24E1E]" />
            </Button>
          </Tooltip>

          <Tooltip title="Download CSV" placement="top">
            <Button className="p-0 min-w-fit">
              <CSVLink
                data={multipleOutput}
                headers={csvHeaders}
                filename={generateFileName(memoryInput) + ".csv"}
                className={`inline-flex items-center`}
              >
                <MdOutlineFileDownload className="text-2xl text-[#F24E1E]" />
              </CSVLink>
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
